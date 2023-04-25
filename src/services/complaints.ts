import {Inject, Service} from 'typedi';
import {Logger} from 'winston';

@Service()
export default class ComplaintsService {
  constructor(@Inject('logger') private logger: Logger) {}

  public async getComplaints() {
    this.logger.info('Service: Calling get complaints');
    return {Hello: 'World'};
  }
}
