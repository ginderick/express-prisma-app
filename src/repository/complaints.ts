import {PrismaClient} from '@prisma/client';
import {Inject, Service} from 'typedi';
import {Logger} from 'winston';

const prisma = new PrismaClient();

@Service()
export default class ComplaintsRepository {
  constructor(@Inject('logger') private logger: Logger) {}

  public async getComplaints() {
    const complaints = prisma.complaint.findMany();
    return complaints;
  }

  public async createComplaint() {
    const complaint = prisma.complaint.create({
      data: {
        address: 'Laguna',
        branch: 'Laguna',
        contact: '09272792253',
        last_message: 'agent',
      },
    });
    return complaint;
  }
}
