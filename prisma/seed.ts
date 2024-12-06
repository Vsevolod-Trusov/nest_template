// HOW TO USE
// 1. npx ts-node seed.ts
// 2. npm install -g ts-node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.chatsToUsers.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.exhibition.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.permissionsToRoles.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();
  await prisma.recording.deleteMany();
  await prisma.event.deleteMany();

  // Создание ролей
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Создание разрешений
  const readPermission = await prisma.permission.create({
    data: {
      name: 'Read',
      category: 'read',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const writePermission = await prisma.permission.create({
    data: {
      name: 'Write',
      category: 'write',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Создание пользователей
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      linkedinLink: 'https://linkedin.com/in/user1',
      password: 'securepassword1',
      roleName: adminRole.name,
      profileAvatar: 'avatar1.png',
      temporalExhibitionLink: 'exhibition1.com',
      profileIsActivated: true,
      followers: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      linkedinLink: 'https://linkedin.com/in/user2',
      password: 'securepassword2',
      roleName: userRole.name,
      profileAvatar: 'avatar2.png',
      temporalExhibitionLink: 'exhibition2.com',
      profileIsActivated: false,
      followers: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Создание выставок
  const exhibition1 = await prisma.exhibition.create({
    data: {
      id: 'exhibition1',
      name: 'Exhibition One',
      description: 'Description for the first exhibition.',
      authorId: user1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const exhibition2 = await prisma.exhibition.create({
    data: {
      id: 'exhibition2',
      name: 'Exhibition Two',
      description: 'Description for the second exhibition.',
      authorId: user2.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Создание обратной связи
  const feedback1 = await prisma.feedback.create({
    data: {
      title: 'Feedback for Exhibition One',
      message: 'Great exhibition!',
      exhibitionId: exhibition1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const feedback2 = await prisma.feedback.create({
    data: {
      title: 'Feedback for Exhibition Two',
      message: 'Interesting artworks!',
      exhibitionId: exhibition2.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Создание чатов
  const chat1 = await prisma.chat.create({
    data: {
      id: 'chat1',
      adminId: user1.id,
      buffer: 'Chat buffer 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const chat2 = await prisma.chat.create({
    data: {
      id: 'chat2',
      adminId: user2.id,
      buffer: 'Chat buffer 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Создание связей между пользователями и чатами
  await prisma.chatsToUsers.create({
    data: {
      chatId: chat1.id,
      userId: user1.id,
      assignedBy: 'user1',
    },
  });

  await prisma.chatsToUsers.create({
    data: {
      chatId: chat1.id,
      userId: user2.id,
      assignedBy: 'user1',
    },
  });

  await prisma.chatsToUsers.create({
    data: {
      chatId: chat2.id,
      userId: user2.id,
      assignedBy: 'user2',
    },
  });

  await prisma.chatsToUsers.create({
    data: {
      chatId: chat2.id,
      userId: user1.id,
      assignedBy: 'user2',
    },
  });

  // Добавление записей в таблицу PermissionsToRoles
  await prisma.permissionsToRoles.create({
    data: {
      roleName: adminRole.name,
      permissionName: readPermission.name,
      assignedBy: 'system',
    },
  });

  await prisma.permissionsToRoles.create({
    data: {
      roleName: adminRole.name,
      permissionName: writePermission.name,
      assignedBy: 'system',
    },
  });

  await prisma.permissionsToRoles.create({
    data: {
      roleName: userRole.name,
      permissionName: readPermission.name,
      assignedBy: 'system',
    },
  });

  // Добавление записей в таблицу Event
  const event1 = await prisma.event.create({
    data: {
      name: 'Event One',
      description: 'Description for the first event.',
      meetingDate: new Date(),
      status: 'init',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const event2 = await prisma.event.create({
    data: {
      name: 'Event Two',
      description: 'Description for the second event.',
      meetingDate: new Date(),
      status: 'accepted',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Добавление записей в таблицу Recording
  const recording1 = await prisma.recording.create({
    data: {
      name: 'Recording One',
      recordLink: 'http://example.com/recording1',
      video: null, // или укажите содержимое, если нужно
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const recording2 = await prisma.recording.create({
    data: {
      name: 'Recording Two',
      recordLink: 'http://example.com/recording2',
      video: null, // или укажите содержимое, если нужно
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log({
    adminRole,
    userRole,
    readPermission,
    writePermission,
    user1,
    user2,
    exhibition1,
    exhibition2,
    feedback1,
    feedback2,
    chat1,
    chat2,
    event1,
    event2,
    recording1,
    recording2,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
