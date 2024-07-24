-- CreateTable
CREATE TABLE "sets" (
    "id" SERIAL NOT NULL,
    "element" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "name_set" TEXT NOT NULL,

    CONSTRAINT "sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elements" (
    "element_id" SERIAL NOT NULL,
    "colour" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "design" INTEGER NOT NULL,
    "element_name" TEXT NOT NULL,
    "element_in_sets" INTEGER NOT NULL,
    "element_introduced_in" INTEGER NOT NULL,
    "design_in_sets" INTEGER NOT NULL,
    "design_introduced_in" INTEGER NOT NULL,

    CONSTRAINT "elements_pkey" PRIMARY KEY ("element_id")
);

-- AddForeignKey
ALTER TABLE "sets" ADD CONSTRAINT "sets_element_fkey" FOREIGN KEY ("element") REFERENCES "elements"("element_id") ON DELETE RESTRICT ON UPDATE CASCADE;
