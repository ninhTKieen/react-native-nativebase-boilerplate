import httpUtil from '@src/utils/http.util';

import {
  IBaseHttpResponse,
  IBaseHttpResponseList,
  TParamsGetList,
} from '../common/common.model';
import {
  TCreateEstate,
  TGetDetailEstate,
  TGetEstateListResponse,
  TInviteMember,
} from './estate.model';

class EstateService {
  async getList({ page = 1, limit = 10, ...otherParams }: TParamsGetList) {
    const response = await httpUtil.request<
      IBaseHttpResponseList<TGetEstateListResponse>
    >({
      method: 'GET',
      url: '/api/estates/get-all',
      params: {
        page,
        limit,
        ...otherParams,
      },
    });

    return response.data;
  }

  async getDetail(id: number) {
    const response = await httpUtil.request<
      IBaseHttpResponse<TGetDetailEstate>
    >({
      method: 'GET',
      url: `/api/estates/${id}`,
    });

    return response.data;
  }

  async create(data: TCreateEstate) {
    if (data?.imageUrls) {
      const response = await httpUtil.uploadImage({
        file: data.imageUrls[0],
      });

      data = {
        ...data,
        imageUrls: [response.data.imagePublicUrl],
        imageUrlIds: [response.data.imagePublicId],
      };
    }
    const response = await httpUtil.request<IBaseHttpResponse<boolean>>({
      method: 'POST',
      url: '/api/estates/create',
      data,
    });

    return response.data;
  }

  async inviteMember(data: TInviteMember, id: number) {
    const response = await httpUtil.request<IBaseHttpResponse<boolean>>({
      method: 'POST',
      url: `/api/estates/${id}/invite-member`,
      data,
    });

    return response.data;
  }
}

const estateService = new EstateService();

export default estateService;
