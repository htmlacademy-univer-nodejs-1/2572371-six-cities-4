import {injectable} from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import {Comment, CommentDbo} from './comment.dbo.js';
import {RentalOfferDbo} from '../rental-offers/rental-offer.dbo.js';
import mongoose from 'mongoose';

@injectable()
export class CommentService implements CommentServiceInterface {
  async findByOfferId(id: mongoose.Types.ObjectId, count: number): Promise<Comment[]> {
    return CommentDbo.find({rentalOfferId: id})
      .sort({createdAt: -1})
      .limit(count)
      .exec();
  }

  async deleteByOfferId(id: mongoose.Types.ObjectId): Promise<void> {
    await CommentDbo.deleteMany({rentalOfferId: id}).exec();
  }

  async find(query: Partial<Comment>): Promise<Comment[]> {
    return CommentDbo.find(query).exec();
  }

  async create(document: Comment): Promise<Comment> {
    const comment = new CommentDbo(document);
    const savedComment = await comment.save();

    await this.updateRentalOfferRating(document.rentalOfferId);

    return savedComment;
  }

  async updateRentalOfferRating(rentalOfferId: string): Promise<void> {
    const comments = await CommentDbo.find({rentalOfferId: rentalOfferId}).exec();

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = comments.length > 0 ? totalRating / comments.length : 0;
    const commentsCount = comments.length;

    const roundedRating = Math.round(averageRating * 10) / 10;

    await RentalOfferDbo.findByIdAndUpdate(
      rentalOfferId,
      {
        rating: roundedRating,
        commentsCount: commentsCount
      }
    );
  }
}
