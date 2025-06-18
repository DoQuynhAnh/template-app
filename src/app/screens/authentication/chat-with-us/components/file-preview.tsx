import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import { IUploadImage } from '../../../../services/service-chat/chat.api';
import { getFileUrl } from '@/utils';
import { useTranslation } from 'react-i18next';
const AntDesign = _AntDesign as unknown as React.ElementType;

interface FilePreviewProps {
  file: IUploadImage | null;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {t} = useTranslation();

  if (!file) {
    return null;
  }

  const isPDF = file.mimetype?.includes('pdf');
  const fileUrl = file.publicUrl || '';

  const downloadAndOpenFile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Đường dẫn tải về
      const localFile = `${RNFS.CachesDirectoryPath}/${file.originalname}`;

      // Tải file
      const response = await RNFS.downloadFile({
        fromUrl: getFileUrl(fileUrl),
        toFile: localFile,
        progressDivider: 10,
      }).promise;

      if (response.statusCode === 200) {
        // Mở file với ứng dụng mặc định
        await FileViewer.open(localFile, { showOpenWithDialog: true });
      } else {
        setError('Unable to download file');
      }
    } catch (err: any) {
      setError(err.message || 'open file error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={!!file}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={{...styles.header, paddingHorizontal: 16}}>
          <Text
            style={styles.fileName}
            numberOfLines={1}
            ellipsizeMode="middle">
            {file.originalname}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.preview}>
          {isPDF ? (
            // Hiển thị PDF trực tiếp
            <Pdf
              source={{ uri: getFileUrl(fileUrl) }}
              onLoadComplete={numberOfPages => {
                console.log(`Loaded ${numberOfPages} pages`);
              }}
              onError={(error: any) => {
                setError(`Unable to download PDF: ${error?.message}`);
              }}
              style={styles.pdf}
            />
          ) : (
            // Hiển thị nút tải xuống và mở cho các file khác
            <View style={styles.nonPdfPreview}>
              <AntDesign
                name={getFileIcon(file.mimetype || '')}
                size={64}
                color="#2760ED"
                style={styles.fileIcon}
              />

              <Text style={styles.fileInfo}>
                {file.originalname} ({formatFileSize(file.size)})
              </Text>

              <TouchableOpacity
                style={styles.openButton}
                onPress={downloadAndOpenFile}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.openButtonText}>{t('chat_with_us:open_file')}</Text>
                )}
              </TouchableOpacity>

              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.includes('pdf')) {
    return 'pdffile1';
  }
  if (mimeType.includes('word') || mimeType.includes('document')) {
    return 'filetext1';
  }
  if (mimeType.includes('sheet') || mimeType.includes('excel')) {
    return 'table';
  }
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    return 'profile';
  }
  return 'file1';
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + ' B';
  }
  if (bytes < 1048576) {
    return (bytes / 1024).toFixed(1) + ' KB';
  }
  if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
  return (bytes / 1073741824).toFixed(1) + ' GB';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0.2,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    padding: 5,
  },
  preview: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  nonPdfPreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fileIcon: {
    marginBottom: 20,
  },
  fileInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  openButton: {
    backgroundColor: '#2760ED',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  openButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
