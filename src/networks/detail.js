import {request} from 'networks/request'

export function getDetail(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }    
  })
}