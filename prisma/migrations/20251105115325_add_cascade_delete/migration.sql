-- DropForeignKey
ALTER TABLE "public"."Upvote" DROP CONSTRAINT "Upvote_streamId_fkey";

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Streams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
