// components/FileMessageItem.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IUploadImage } from '../../../../services/service-chat/chat.api';

const FontAwesome = _FontAwesome as unknown as React.ElementType;

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  uri: string;
  id: string;
}

interface FileMessageItemProps {
  fileInfo: IUploadImage | undefined;
  position: 'left' | 'right';
   onPress?: (fileInfo: IUploadImage) => void;
}

export const FileMessageItem: React.FC<FileMessageItemProps> = ({
  fileInfo,
  position,
  onPress
}) => {
  const {
    theme: { color },
  } = useStyles();

   const handlePress = () => {
    if (fileInfo && onPress) {
      onPress(fileInfo);
    }
  };

  // Chuyển đổi kích thước file thành dạng dễ đọc
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(1) + ' KB';
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(1) + ' MB';
    } else {
      return (bytes / 1073741824).toFixed(1) + ' GB';
    }
  };

  // Lấy icon thích hợp cho loại file
  const getFileIcon = (fileType: string) => {
    const type = fileType?.toLowerCase();
    if (type.includes('pdf')) {
      return 'file-pdf-o';
    }
    if (type.includes('doc') || type.includes('word')) {
      return 'file-word-o';
    }
    if (type.includes('xls') || type.includes('sheet')) {
      return 'file-excel-o';
    }
    if (type.includes('ppt') || type.includes('presentation')) {
      return 'file-powerpoint-o';
    }
    if (
      type.includes('zip') ||
      type.includes('rar') ||
      type.includes('compressed')
    ) {
      return 'file-zip-o';
    }
    if (type.includes('text') || type.includes('txt')) {
      return 'file-text-o';
    }
    return 'file-o';
  };

  if (!fileInfo) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: position === 'left' ? '#f0f0f0' : color.primaryBase,
        },
      ]}
      onPress={handlePress}>
      <View style={styles.fileContent}>
        <FontAwesome
          name={getFileIcon(fileInfo.mimetype)}
          size={24}
          color={position === 'left' ? color.primaryBase : '#fff'}
          style={styles.fileIcon}
        />
        <View style={styles.fileInfo}>
          <Text
            style={[
              styles.fileName,
              { color: position === 'left' ? '#333' : '#fff' },
            ]}
            numberOfLines={1}
            ellipsizeMode="middle">
            {fileInfo.originalname}
          </Text>
          <Text
            style={[
              styles.fileSize,
              { color: position === 'left' ? '#777' : 'rgba(255,255,255,0.8)' },
            ]}>
            {formatFileSize(fileInfo.size)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
    maxWidth: 250,
    minWidth: 200,
    backgroundColor: 'red',
  },
  fileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    marginRight: 10,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  fileSize: {
    fontSize: 12,
    marginTop: 2,
  },
});
