import emitter from 'src/share/emitter';
import enUS from './lang/en-US';
import zhCN from './lang/zh-CN';

type LangItem = { [x: string]: string };
type Langs = { [x: string]: LangItem };

class I18n {
  private langs: Langs = { en: enUS, zh: zhCN };
  private current: string = 'zh';

  constructor() {
    this.setUp();
  }

  setUp() {
    if (typeof window === 'undefined') {
      // 不在浏览器环境中，取消检测
      return;
    }
    // @ts-ignore
    let userLanguage = window.navigator.userLanguage || window.navigator.language;
    userLanguage = userLanguage === 'zh-CN' ? 'zh' : 'en';
    const locale = window.localStorage.getItem('locale') || userLanguage;

    if (this.current !== locale && this.isAvaliable(locale)) {
      this.current = locale;
      emitter.emit(emitter.EVENT_LANG_CHANGE, this, locale, this.langs[locale]);
    }
  }

  isAvaliable(langName: string) {
    return typeof this.langs[langName] !== 'undefined';
  }

  add(langName: string, lang: LangItem) {
    this.langs[langName] = lang;
  }

  setCurrent(langName: string) {
    if (!this.isAvaliable(langName)) {
      throw new Error(`Language ${langName} is not exists`);
    }
    if (this.current !== langName) {
      this.current = langName;
      emitter.emit(emitter.EVENT_LANG_CHANGE, this, langName, this.langs[langName]);
    }
  }

  get(key: string, placeholders?: { [x: string]: string }) {
    let str = this.langs[this.current][key] || '';
    if (placeholders) {
      Object.keys(placeholders).forEach(k => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), placeholders[k]);
      });
    }
    return str;
  }

  getCurrent() {
    return this.current;
  }
}

const i18n = new I18n();
export default i18n;
