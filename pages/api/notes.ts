// api/notes.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const notes = await prisma?.note.findMany({
        select: {
          title: true,
          id: true,
          content: true,
        },
      });

      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  } if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: 'Missing note ID' });
      return;
    }

    try {
      const deletedNote = await prisma.note.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: 'Note deleted successfully', deletedNote });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the note' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
