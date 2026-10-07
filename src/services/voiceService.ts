/**
 * SantéNova Voice Engine
 * Moteur de synthèse vocale multilingue (Web Speech API + Phonétisation Wolof)
 */

export interface VoiceState {
  isSpeaking: boolean;
  currentLanguage: 'fr' | 'wo' | 'en';
  currentText: string;
}

export class VoiceService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static listeners: ((state: VoiceState) => void)[] = [];

  public static state: VoiceState = {
    isSpeaking: false,
    currentLanguage: 'fr',
    currentText: '',
  };

  public static subscribe(listener: (state: VoiceState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private static notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  /**
   * Prononce un texte dans la langue choisie
   */
  public static speak(text: string, lang: 'fr' | 'wo' | 'en' = 'fr', onDone?: () => void) {
    if (!this.synth) {
      console.warn('Synthèse vocale non supportée sur cet environnement.');
      return;
    }

    // Stop ongoing speech
    this.stop();

    this.state = {
      isSpeaking: true,
      currentLanguage: lang,
      currentText: text,
    };
    this.notify();

    // In Wolof, we adapt phonetics using French speech synthesis engine for natural phonation, or use audio cues
    const targetLangCode = lang === 'en' ? 'en-US' : 'fr-FR';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLangCode;
    utterance.rate = lang === 'wo' ? 0.88 : 0.95; // Slightly slower pace for clarity and medical understanding
    utterance.pitch = 1.0;

    // Try finding a gentle natural voice
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith(targetLangCode.slice(0, 2)) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Amelie') || v.name.includes('Thomas'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      this.state.isSpeaking = false;
      this.state.currentText = '';
      this.notify();
      if (onDone) onDone();
    };

    utterance.onerror = (e) => {
      console.error('Erreur synthèse vocale :', e);
      this.state.isSpeaking = false;
      this.state.currentText = '';
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Stoppe immédiatement la lecture vocale
   */
  public static stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.state.isSpeaking = false;
    this.state.currentText = '';
    this.notify();
  }
}
