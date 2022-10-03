import { VoteType } from './vote-type';

export class VotePayload {
    "voteType" : VoteType|null;
    "postId" : number|null;
}
