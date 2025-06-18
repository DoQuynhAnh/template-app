import I18n from './index';

export function translate(key: I18nKeys, option?: Record<string, unknown>) {
  return key ? I18n.t(key, option) : '';
}

export const changeLanguage = (language: 'vi' | 'en' | 'ko') => {
  I18n.changeLanguage(language);
  // Có thể lưu lựa chọn ngôn ngữ vào AsyncStorage để giữ nguyên sau khi khởi động lại ứng dụng
};
