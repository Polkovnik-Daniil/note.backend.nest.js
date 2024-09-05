import {
  Editor,
  Label,
  LabelNotes,
  Note,
  PrismaClient,
  Reader,
  User,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding process...');
  const seededMessage = (table: string) => console.log(`${table} seeded.`);
  const skipSeedingMessage = (table: string) =>
    console.log(`${table} already exist, skipping seeding.`);

  //User
  const countUser: number = await prisma.user.count();
  if (countUser === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) => {
        prisma.user.create({
          data: {
            email: `test${index}@prisma.io`,
            first_name: 'Alex',
            surname_name: 'Camino',
            hash_passsword: bcrypt.hashSync('1', 10),
            isEmailVerified: true,
            isActivated: true,
          },
        });
      }),
    );
    seededMessage('User');
  } else {
    skipSeedingMessage('User');
  }
  let users: User[] = await prisma.user.findMany({ take: 10 });

  //Label
  const countLabel: number = await prisma.label.count();
  if (countLabel === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) => {
        prisma.label.create({
          data: {
            name: `test${index}_name`,
            user_id: users[index].id,
          },
        });
      }),
    );
    seededMessage('Label');
  } else {
    skipSeedingMessage('Label');
  }
  let labels: Label[] = await prisma.label.findMany({ take: 10 });

  //Note
  const countNotes: number = await prisma.note.count();
  if (countNotes === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) => {
        prisma.note.create({
          data: {
            title: `test${index}_title`,
            description: `test${index}_description`,
            content: null,
            isPublic: true,
            user_id: users[index].id,
          },
        });
      }),
    );
    seededMessage('Note');
  } else {
    skipSeedingMessage('Note');
  }
  let notes: Note[] = await prisma.note.findMany({ take: 10 });

  //LabelNotes
  const countLabelNotes: number = await prisma.labelNotes.count();
  if (countLabelNotes === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) => {
        prisma.labelNotes.create({
          data: {
            note_id: notes[index].id,
            label_id: labels[index].id,
            isPublic: true,
          },
        });
      }),
    );
    seededMessage('Label');
  } else {
    skipSeedingMessage('Label');
  }
  let labelNotes: LabelNotes[] = await prisma.labelNotes.findMany({ take: 10 });

  //Editor
  const countEditor: number = await prisma.editor.count();
  if (countEditor === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) => {
        prisma.editor.create({
          data: {
            user_id: users[index].id,
            note_id: notes[index].id,
            label_id: labels[index].id,
            label_notes_id: labelNotes[index].id,
          },
        });
      }),
    );
    seededMessage('Label');
  } else {
    skipSeedingMessage('Label');
  }
  // let editors: Editor[] = await prisma.labelNotes.findMany({ take: 10 });

  //Reader
  const countReader: number = await prisma.reader.count();
  if (countReader === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) => {
        prisma.reader.create({
          data: {
            user_id: users[index].id,
            note_id: notes[index].id,
            label_id: labels[index].id,
            label_notes_id: labelNotes[index].id,
          },
        });
      }),
    );
    seededMessage('Label');
  } else {
    skipSeedingMessage('Label');
  }
  // let readers: Reader[] = await prisma.reader.findMany({ take: 10 });

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
