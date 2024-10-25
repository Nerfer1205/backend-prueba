import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Prellenado de Roles
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Coordinador' },
      { id: 3, name: 'Docente' },
      { id: 4, name: 'Estudiante' },
    ],
    skipDuplicates: true, // Evita duplicados si los datos ya existen
  });

  // Prellenado de Estados de Inscripción
  await prisma.inscriptionStatus.createMany({
    data: [
      { id: 1, name: 'Inscripto' },
      { id: 2, name: 'Aprobado' },
      { id: 3, name: 'Rechazado' },
      { id: 4, name: 'Certificado' },
    ],
    skipDuplicates: true,
  });

  // Prellenado de Categorías
  await prisma.category.createMany({
    data: [
      { id: 1, name: 'Programación' },
      { id: 2, name: 'Big Data' },
      { id: 3, name: 'Blockchain' },
      { id: 4, name: 'Marketing' },
    ],
    skipDuplicates: true,
  });

  // Prellenado de Modalidades
  await prisma.modality.createMany({
    data: [
      { id: 1, name: 'Virtual' },
      { id: 2, name: 'Remoto' },
      { id: 3, name: 'Presencial' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log('Datos de seed cargados con éxito.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error en el seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
