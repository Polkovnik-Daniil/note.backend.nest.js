import {
  Editor,
  EditorLabelNote,
  Label,
  LabelNote,
  Note,
  PrismaClient,
  Reader,
  ReaderLabelNote,
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
  if (countUser === 0 && countUser < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.user.create({
          data: {
            email: `test${index}@prisma.io`,
            firstName: 'Alex',
            surnameName: 'Camino',
            hashPasssword: bcrypt.hashSync('1', 10),
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

  //Editor
  const countEditor: number = await prisma.editor.count();
  if (countEditor === 0 && countEditor < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.editor.create({
          data: {
            userId: users[index].id,
          },
        });
      }),
    );
    seededMessage('Editor');
  } else {
    skipSeedingMessage('Editor');
  }
  let editors: Editor[] = await prisma.editor.findMany({ take: 10 });

  //Reader
  const countReader: number = await prisma.reader.count();
  if (countReader === 0 && countReader < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.reader.create({
          data: {
            userId: users[index].id,
          },
        });
      }),
    );
    seededMessage('Reader');
  } else {
    skipSeedingMessage('Reader');
  }
  let readers: Reader[] = await prisma.reader.findMany({ take: 10 });

  //Label
  const countLabel: number = await prisma.label.count();
  if (countLabel === 0 && countLabel < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.label.create({
          data: {
            name: `test${index}Name`,
            userId: users[index].id,
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
  if (countNotes === 0 && countNotes < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.note.create({
          data: {
            title: `test${index}_title`,
            description: `test${index}_description`,
            content: null,
            isPublic: true,
            userId: users[index].id,
          },
        });
      }),
    );
    seededMessage('Note');
  } else {
    skipSeedingMessage('Note');
  }
  let notes: Note[] = await prisma.note.findMany({ take: 10 });

  //LabelNote
  const countLabelNote: number = await prisma.labelNote.count();
  if (countLabelNote === 0 && countLabelNote < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.labelNote.create({
          data: {
            noteId: notes[index].id,
            labelId: labels[index].id,
            isPublic: true,
          },
        });
      }),
    );
    seededMessage('LabelNote');
  } else {
    skipSeedingMessage('LabelNote');
  }
  let labelNotes: LabelNote[] = await prisma.labelNote.findMany({ take: 10 });

  //EditorLabelNote
  const countEditorLabelNote: number = await prisma.editorLabelNote.count();
  if (countEditorLabelNote === 0 && countEditorLabelNote < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.editorLabelNote.create({
          data: {
            editorId: editors[index].id,
            labelNoteId: labelNotes[index].id,
          },
        });
      }),
    );
    seededMessage('EditorLabelNote');
  } else {
    skipSeedingMessage('EditorLabelNote');
  }
  let editorLabelNotes: EditorLabelNote[] =
    await prisma.editorLabelNote.findMany({
      take: 10,
    });

  //ReaderLabelNote
  const countReaderLabelNote: number = await prisma.readerLabelNote.count();
  if (countReaderLabelNote === 0 && countReaderLabelNote < 10) {
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        await prisma.readerLabelNote.create({
          data: {
            readerId: readers[index].id,
            labelNoteId: labelNotes[index].id,
          },
        });
      }),
    );
    seededMessage('ReaderLabelNote');
  } else {
    skipSeedingMessage('ReaderLabelNote');
  }
  let readerLabelNotes: ReaderLabelNote[] =
    await prisma.readerLabelNote.findMany({
      take: 10,
    });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Database seeded successfully!');
  })
  .catch(async (e) => {
    console.error('Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
