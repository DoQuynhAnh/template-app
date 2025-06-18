/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, ColorValue, Linking } from 'react-native';

import { processColor } from 'react-native-reanimated';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

import { remove } from '@storage';

import { MMKV_KEY } from '../constant';
import { translate } from '@/library/utils/i18n/translate';
import { signOut } from '@/library/auth';

export const onShowErrorBase = (msg: string) => {
  Alert.alert(msg);
};

export const logout = (setIsAuth?: (isAuth: boolean) => void) => {
  remove(MMKV_KEY.APP_TOKEN);
  signOut();
  setIsAuth && setIsAuth(false);
};

export const propsToStyle = (arrStyle: Array<any>) => {
  return arrStyle.filter(
    x => x !== undefined && !Object.values(x).some(v => v === undefined),
  );
};

export const openLinking = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

export const setAlpha = (color: ColorValue, alpha = 1) => {
  'worklet';
  let num = typeof color === 'number' ? color : processColor(color);

  if (typeof num !== 'number') {
    return color;
  }

  num >>>= 0;

  const b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;

  return 'rgba(' + [r, g, b, alpha].join(',') + ')';
};

export const timeAgo = (
  date: Date,
): { title: I18nKeys; options?: { count: number } } => {
  const diff = (new Date().getTime() - date.getTime()) / 1000;

  const day_diff = Math.floor(diff / 86400);

  const conditions: Array<{
    check: boolean;
    result: { title: I18nKeys; options?: any };
  }> = [
    {
      check: isNaN(day_diff) || day_diff < 0 || day_diff >= 31,
      result: { title: 'date:just_now' },
    },
    { check: day_diff === 0 && diff < 60, result: { title: 'date:just_now' } },
    {
      check: day_diff === 0 && diff < 120,
      result: { options: { count: 1 }, title: 'date:minute_ago' },
    },
    {
      check: day_diff === 0 && diff < 3600,
      result: {
        options: { count: Math.floor(diff / 60) },
        title: 'date:minute_ago',
      },
    },
    {
      check: day_diff === 0 && diff < 7200,
      result: { options: { count: 1 }, title: 'date:hour_ago' },
    },
    {
      check: day_diff === 0 && diff < 86400,
      result: {
        options: { count: Math.floor(diff / 3600) },
        title: 'date:hour_ago',
      },
    },
    { check: day_diff === 1, result: { title: 'date:yesterday' } },
    { check: day_diff < 7, result: { title: 'date:last_week' } },
    { check: day_diff < 31, result: { title: 'date:last_month' } },
    {
      check: day_diff < 365,
      result: {
        options: { count: Math.ceil(day_diff / 30) },
        title: 'date:months_ago',
      },
    },
    { check: day_diff === 365, result: { title: 'date:last_year' } },
    {
      check: true,
      result: {
        options: { count: Math.floor(day_diff / 365) },
        title: 'date:years_ago',
      },
    },
  ];

  for (const condition of conditions) {
    if (condition.check) {
      return condition.result;
    }
  }

  return {
    options: { count: Math.floor(day_diff / 365) },
    title: 'date:years_ago',
  };
};

/* eslint-disable no-inline-comments */
type TimeAgoOptions = {
  long?: boolean; // Format dài (vd: "2 giờ trước") hoặc ngắn (vd: "2h")
  locale?: 'en' | 'vi'; // Ngôn ngữ hiển thị
};

export function timeAgoType2(
  timestamp: number | Date,
  options: TimeAgoOptions = { locale: 'vi', long: true },
) {
  const { long = true, locale = 'vi' } = options;

  // Chuyển timestamp thành Date object nếu là number
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // Các khoảng thời gian tính bằng milliseconds
  const intervals = {
    // 7 * 24 * 60 * 60 * 1000
    day: 86400000,

    // 24 * 60 * 60 * 1000
    hour: 3600000,

    // 60 * 60 * 1000
    minute: 60000,

    // 365 * 24 * 60 * 60 * 1000
    month: 2592000000,

    // 60 * 1000
    second: 1000,

    // 30 * 24 * 60 * 60 * 1000
    week: 604800000,

    year: 31536000000,
  };

  // Text hiển thị theo ngôn ngữ
  const localeText = {
    en: {
      ago: 'ago',
      day: ['day', 'days'],
      hour: ['hour', 'hours'],
      just: 'just now',
      minute: ['minute', 'minutes'],
      month: ['month', 'months'],
      second: ['second', 'seconds'],
      week: ['week', 'weeks'],
      year: ['year', 'years'],
    },
    vi: {
      ago: 'trước',
      day: ['ngày', 'ngày'],
      hour: ['giờ', 'giờ'],
      just: 'vừa xong',
      minute: ['phút', 'phút'],
      month: ['tháng', 'tháng'],
      second: ['giây', 'giây'],
      week: ['tuần', 'tuần'],
      year: ['năm', 'năm'],
    },
  };

  // Nếu thời gian < 30 giây
  if (diff < 30 * 1000) {
    return localeText[locale].just;
  }

  // Tìm khoảng thời gian phù hợp nhất
  for (const [unit, ms] of Object.entries(intervals)) {
    const value = Math.floor(diff / ms);
    if (value >= 1) {
      // Format ngắn
      if (!long) {
        const shortUnit = unit.charAt(0);
        return `${value}${shortUnit}`;
      }

      // Format dài
      const text = localeText[locale][unit as keyof (typeof localeText)['vi']];
      const unitText = value === 1 ? text[0] : text[1];
      return `${value} ${unitText} ${localeText[locale].ago}`;
    }
  }

  return localeText[locale].just;
}

export const pickMedia = async ({
  mediaType = 'mixed',
}: {
  mediaType?: MediaType;
}) => {
  const result = await launchImageLibrary({ mediaType });
  if (result.assets) {
    return result.assets[0];
  }
  return null;
};

export const pickFile = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    if (result[0]) {
      return result[0];
    }
    return null;

  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('Người dùng đã hủy chọn file');
    } else {
      console.error('Lỗi khi chọn file:', err);
    }

    return null
  }
};

export const handleErrorApi = (status: number) => {
  const result = { status: false, code: status, msg: '' };
  if (status > 505) {
    result.msg = translate('error:server_error');
    return result;
  }
  if (status < 500 && status >= 418) {
    result.msg = translate('error:error_on_request');
    return result;
  }
  result.msg = translate(('error:' + status) as I18nKeys);
  return result;
};
