/* eslint-disable max-params */
import { API_URL } from '@/common/api/axios-instance';
import { getImageUrl } from '@/utils';

/**
 * Chuyển đổi đường dẫn ảnh tương đối thành đường dẫn tuyệt đối
 * @param src Đường dẫn ảnh cần xử lý
 * @param baseUrl URL cơ sở (domain) của API
 * @returns Đường dẫn ảnh đầy đủ
 */
const getFullImageUrl = (src: string): string => {
  if (!src) return '';

  // Nếu đã là URL đầy đủ thì trả về nguyên bản
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Xử lý đường dẫn bắt đầu bằng /
  if (src.startsWith('/')) {
    return `${getImageUrl(src)}`;
  }

  // Trường hợp còn lại
  return `${API_URL}/${src}`;
};

/**
 * Xử lý nội dung HTML để thay thế tất cả các đường dẫn ảnh tương đối thành tuyệt đối
 * @param html Nội dung HTML cần xử lý
 * @param baseUrl URL cơ sở
 * @returns Nội dung HTML sau khi đã xử lý
 */
const processHtmlContent = (
  html: string,
): string => {
  if (!html) return '';

  // Tìm tất cả các thẻ img và thay thế src
  return html.replace(
    /<img\s+([^>]*?)src=['"]([^'"]+)['"]([^>]*?)>/gi,
    (match, before, src, after) => {
      const fullUrl = getFullImageUrl(src);
      return `<img ${before}src="${fullUrl}"${after}>`;
    },
  );
};

export { getFullImageUrl, processHtmlContent };
