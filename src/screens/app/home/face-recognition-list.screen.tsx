import SubLayout from '@src/components/sub-layout';
import { APP_API_ENDPOINT, HOME_ID_KEY } from '@src/configs/constant';
import { i18nKeys } from '@src/configs/i18n';
import { storage } from '@src/configs/mmkv.storage';
import { TGetListRecognizedFace } from '@src/features/recognized-faces/recognized-face.model';
import recognizedFaceService from '@src/features/recognized-faces/recognized-face.service';
import { formatDate } from '@src/utils/date.util';
import { useQuery } from '@tanstack/react-query';
import { Box, FlatList, Image, Row, Stack, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListRenderItem, RefreshControl } from 'react-native';

const FaceRecognitionListScreen = () => {
  const { t } = useTranslation();
  const homeId = Number(storage.getString(HOME_ID_KEY));

  const query = useQuery({
    queryKey: ['devices/getFaceRecognitionList', { estateId: homeId }],
    queryFn: () => recognizedFaceService.getList(homeId),
  });

  const renderItem: ListRenderItem<TGetListRecognizedFace> = ({ item }) => {
    return (
      <Stack
        direction="row"
        space="5"
        shadow={2}
        bgColor="white"
        p={2}
        borderRadius="xl"
      >
        <Image
          source={{ uri: `${APP_API_ENDPOINT}${item.imageUrl}` }}
          alt={item.name}
          width="32"
          height="32"
          borderRadius="full"
        />

        <Box flex={1} justifyContent="space-between">
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="primary.600">
              {item.name}
            </Text>

            <Text fontSize="sm" color="muted.400">
              {item.idCode}
            </Text>
          </Box>

          <Row alignItems="center">
            <Text fontSize="sm" color="primary.600">
              {t(i18nKeys.common.createdAt)}
              {': '}
            </Text>

            <Text fontSize="sm" color="muted.400">
              {formatDate(item.createdAt)}
            </Text>
          </Row>
        </Box>
      </Stack>
    );
  };

  return (
    <SubLayout title={t(i18nKeys.devices.recognitionList)}>
      <Box flex={1} bgColor="white">
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={query.isLoading}
              onRefresh={query.refetch}
            />
          }
          data={query.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Box h={5} />}
          contentContainerStyle={{ padding: 10 }}
        />
      </Box>
    </SubLayout>
  );
};

export default FaceRecognitionListScreen;
