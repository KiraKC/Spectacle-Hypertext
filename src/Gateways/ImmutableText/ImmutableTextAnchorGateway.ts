import { failureServiceResponse, IImmutableTextAnchor, IImmutableTextAnchorGateway, IServiceResponse } from "hypertext-interfaces";
import { get, post, remove } from "../request";

let base_endpoint = "https://stormy-hamlet-90499.herokuapp.com"

if (process.env.REACT_APP_BACKEND_ENV === 'development') {
  base_endpoint = "http://localhost:8081"
}

const servicePath = '/immutable-text-anchor'

const ImmutableTextAnchorGateway: IImmutableTextAnchorGateway = {

  createAnchor: async (anchor: IImmutableTextAnchor): Promise<IServiceResponse<IImmutableTextAnchor>> => {

    const raw = {"data": anchor};
    const fullUrl = `${base_endpoint}${servicePath}/`

    try {
      const response: IServiceResponse<IImmutableTextAnchor> = await post<IServiceResponse<IImmutableTextAnchor>>(fullUrl, raw);
      return response

    } catch (e) {
      return failureServiceResponse("Failed to create anchor. " + e)
    }
  },
    
  getAnchor: async (anchorId: string): Promise<IServiceResponse<IImmutableTextAnchor>> => {
    
    try {
      const fullUrl = `${base_endpoint}${servicePath}/${anchorId}`
      const response: IServiceResponse<IImmutableTextAnchor> = await get<IServiceResponse<IImmutableTextAnchor>>(fullUrl);
      return response
    } catch (e) {
      return failureServiceResponse('Failed to call getAnchor endpoint.')
    }  
  },

  getAnchors: async (anchorIds: string[]): Promise<IServiceResponse<{[anchorId: string] : IImmutableTextAnchor}>> => {
    
    try {
      const fullUrl = `${base_endpoint}${servicePath}/list/${anchorIds.join(',')}`
      const response: IServiceResponse<{[anchorId: string] : IImmutableTextAnchor}> = await get<IServiceResponse<{[anchorId: string] : IImmutableTextAnchor}>>(fullUrl);
      return response
    } catch (e) {
      return failureServiceResponse('Failed to call getAnchor endpoint.')
    }  
  },
    
  deleteAnchor: async (anchorId: string): Promise<IServiceResponse<{}>> => {    
    try {
      const fullUrl = `${base_endpoint}${servicePath}/${anchorId}`
      const response: IServiceResponse<{}> = await remove<IServiceResponse<{}>>(fullUrl);
      return response

    } catch (e) {
      return failureServiceResponse('Failed to call deleteAnchor endpoint.')
    }
  },

  deleteAnchors: async (anchorIds: string[]): Promise<IServiceResponse<{}>> => {    
    try {
      const fullUrl = `${base_endpoint}${servicePath}/list/${anchorIds.join(',')}`
      const response: IServiceResponse<{}> = await remove<IServiceResponse<{}>>(fullUrl);
      return response

    } catch (e) {
      return failureServiceResponse('Failed to call deleteAnchor endpoint.')
    }
  }
}

export default ImmutableTextAnchorGateway