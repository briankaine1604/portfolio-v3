ALTER TABLE "snippets" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "language" varchar(50) DEFAULT 'text';