import * as React from "react";
import { useEffect, useRef } from "react";

const TTS_ENGINE_KEY = 'jp_tts_engine';
const TTS_ENDPOINT_KEY = 'jp_tts_endpoint';

interface IVoicePlayer {
    text?: string;
    isClickPlaying?: boolean;
    setIsClickPlaying?: React.Dispatch<React.SetStateAction<boolean>>;
}

const VoicePlayer = (props: IVoicePlayer) => {
    const { text = '' } = props;
    const { isClickPlaying = false, setIsClickPlaying = () => undefined } = props;
    const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const cloudAudioRef = useRef<HTMLAudioElement | null>(null);

    const normalizeSpeakText = (rawText: string) => rawText
        ?.replace(/[、]/g, '、 ')
        ?.replace(/[。]/g, '。 ')
        ?.replace(/[!?！？]/g, (match: string) => `${match} `)
        ?.replace(/\s+/g, ' ')
        ?.trim();

    const isAllowedCloudEndpoint = (endpoint: string) => {
        try {
            const parsedUrl = new URL(endpoint);
            const isLocalDevHost = parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1';
            return parsedUrl.protocol === 'https:' || isLocalDevHost;
        } catch {
            return false;
        }
    };

    const getBestJapaneseVoice = () => {
        const availableVoices = window.speechSynthesis.getVoices() || [];
        const japaneseVoices = availableVoices.filter((voice) => voice.lang?.toLowerCase().startsWith('ja'));

        if (!japaneseVoices.length) {
            return null;
        }

        const preferredVoice = japaneseVoices.find((voice) => /kyoko|otoya|google|natural/i.test(voice.name));
        return preferredVoice || japaneseVoices[0];
    };

    useEffect(() => {
        if (!isClickPlaying) {
            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                window.speechSynthesis.cancel();
            }

            if (cloudAudioRef.current) {
                cloudAudioRef.current.pause();
                cloudAudioRef.current = null;
            }

            setIsClickPlaying(false);
            return;
        }

        const speakingText = normalizeSpeakText(text);

        if (!speakingText?.length) {
            setIsClickPlaying(false);
            return;
        }

        const ttsEngine = localStorage.getItem(TTS_ENGINE_KEY) || 'browser';
        const ttsEndpoint = localStorage.getItem(TTS_ENDPOINT_KEY) || '';

        if (ttsEngine === 'cloud' && ttsEndpoint?.trim().length && isAllowedCloudEndpoint(ttsEndpoint)) {
            const speakByCloud = async () => {
                try {
                    const response = await fetch(ttsEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            text: speakingText,
                            lang: 'ja-JP',
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('cloud tts failed');
                    }

                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    cloudAudioRef.current = audio;
                    audio.onended = () => {
                        setIsClickPlaying(false);
                        URL.revokeObjectURL(audioUrl);
                    };
                    audio.onerror = () => {
                        setIsClickPlaying(false);
                        URL.revokeObjectURL(audioUrl);
                    };
                    await audio.play();
                } catch (error) {
                    setIsClickPlaying(false);
                }
            };

            speakByCloud();

            return () => {
                if (cloudAudioRef.current) {
                    cloudAudioRef.current.pause();
                    cloudAudioRef.current = null;
                }
            };
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speakingText);
        const selectedVoice = getBestJapaneseVoice();

        utterance.lang = selectedVoice?.lang || 'ja-JP';
        utterance.voice = selectedVoice;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => setIsClickPlaying(false);
        utterance.onerror = () => setIsClickPlaying(false);
        currentUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);

        return () => {
            if (currentUtteranceRef.current) {
                window.speechSynthesis.cancel();
                currentUtteranceRef.current = null;
            }

            if (cloudAudioRef.current) {
                cloudAudioRef.current.pause();
                cloudAudioRef.current = null;
            }
        };
    }, [isClickPlaying, text, setIsClickPlaying]);

    useEffect(() => {
        const refreshVoices = () => {
            window.speechSynthesis.getVoices();
        };
        window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
        refreshVoices();

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', refreshVoices);
        };
    }, []);

    return <></>;
};

export default VoicePlayer;