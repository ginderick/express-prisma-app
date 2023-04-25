import ComplaintsRepository from '../repository/complaints';
import Container, {Inject, Service} from 'typedi';
import {Logger} from 'winston';

@Service()
export default class ComplaintsService {
  constructor(
    @Inject('logger') private logger: Logger,
    private complaintsRepository = Container.get(ComplaintsRepository)
  ) {}

  public async getComplaints() {
    this.logger.info('Service: Getting complaints');
    const complaints = this.complaintsRepository.getComplaints();
    return complaints;
  }

  public async createComplaint() {
    this.logger.info('Service: Creating a complaint');
    const complaint = this.complaintsRepository.createComplaint();
    return complaint;
  }
}
