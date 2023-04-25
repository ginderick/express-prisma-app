import {Service} from 'typedi';

@Service()
export default class ComplaintsService {
  constructor() {}

  public async getComplaints() {
    return {Hello: 'World'};
  }
}
