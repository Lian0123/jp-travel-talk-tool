import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
            appName: "JP-Voice-Saver",
            addVoiceData:"Add Voice Data",
            title: "Title",
            tag: "Tag",
            allTag: "All Tag",
            notTag: "None Tag",
            voiceText: "Voice Text",
            voiceAbout: "Voice About",
            playAudio: "Play Audio",
            stopAudio: "Stop Audio",
            searchData: "Search Data",
            searchContent: "Search Content",
            searchType: "Search Type",
            search: "Search",
            addNewVoiceCard: "Add New Voice Card",
            importVoiceCard: "Import Voice Card By .json file",
            about: "About",
            aboutContent: "The web is develop from lian0123, voice is from wiki",
            projectLink: "Project Link",
            changeLanguage: "Change Language",
            handMode: "Hand Mode",
            leftHandMode: "Left Hand Mode",
            rightHandMode: "Right Hand Mode",
            edit: "Edit",
            delete: "Delete",
            setOrder: "Set Order",
            addAndEditTag: "Add And Edit Tag",
            addTag: "Add Tag",
            editTag: "Edit Tag",
            exportFile: "Export File",
            orderSetting: "Order Seting",
            editVoiceData: "Edit Voice Data",
            notFetchVoiceCard: "Not fetch voice card, can't export file",
        }
      },
      'zh-TW': {
        translations: {
            appName: "日語預存器",
            addVoiceData:"新增語音資料",
            title: "標題",
            tag: "標籤",
            notTag: "無標籤",
            allTag: "所有標籤",
            voiceText: "文字",
            voiceAbout: "註記",
            playAudio: "播放語音",
            stopAudio: "停止播放",
            searchData: "搜尋資料",
            searchContent: "搜尋內容",
            searchType: "搜尋類型",
            search: "搜尋",
            addNewVoiceCard: "新增卡片",
            importVoiceCard: "由json匯入",
            about: "關於",
            aboutContent: "此網頁由lian0123開發. 音訊檔案來自於維基百科公有資源\n\n ",
            projectLink: "專案連結",
            changeLanguage: "變換語言",
            handMode: "操作模式",
            leftHandMode: "左手模式",
            rightHandMode: "右手模式",
            edit: "編輯",
            delete: "清除",
            setOrder: "設定排序",
            addAndEditTag: "新增與編輯標籤",
            addTag: "新增標籤",
            editTag: "編輯標籤",
            exportFile: "匯出檔案",
            orderSetting: "排序設定",
            editVoiceData: "編輯語音資料",
            notFetchVoiceCard: "沒有符合條件的詞卡，無法匯出",
        }
      }
    },
    fallbackLng:'zh-TW',
    // debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
