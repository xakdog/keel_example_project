import { expect, test } from 'vitest';
import { actions, models } from '@teamkeel/testing';
 
test('a problematic test', async () => {
  const johnDoe = await models.identity.create({
    // id: 'john', // <-- this is the problem
    email: 'john@example.com',
  });

  const project = await models.project.create({
    title: 'Rust Doge',
    ownerId: johnDoe.id,
  });

  const fetchedRecord = await actions.withIdentity(johnDoe).getProject({ id: project.id });

  expect(fetchedRecord).toEqual(project);
});
