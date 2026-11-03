import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adaptador = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: adaptador });

async function cargarDatos() {
  await prisma.message.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.file.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.news.deleteMany();
  await prisma.event.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.member.deleteMany();
  await prisma.user.deleteMany();
  await prisma.discipline.deleteMany();

  const disciplinas = await prisma.discipline.createManyAndReturn({
    data: [
      {
        nombre: 'Fútbol',
        descripcion: 'Inferiores y primera',
        cuotaMensual: 15000,
      },
      {
        nombre: 'Básquet',
        descripcion: 'Formativas y mayores',
        cuotaMensual: 12000,
      },
      {
        nombre: 'Vóley',
        descripcion: 'Femenino y masculino',
        cuotaMensual: 11000,
      },
      {
        nombre: 'Natación',
        descripcion: 'Escuela y competición',
        cuotaMensual: 14000,
      },
      {
        nombre: 'Hockey',
        descripcion: 'Damas y caballeros',
        cuotaMensual: 13000,
      },
    ],
  });

  const usuarios = await prisma.user.createManyAndReturn({
    data: [
      {
        nombre: 'Laura Gómez',
        email: 'admin@clubsanmartin.com',
        contrasena: 'admin123',
        rol: 'admin',
      },
      {
        nombre: 'Martín Díaz',
        email: 'mdiaz@clubsanmartin.com',
        contrasena: 'personal123',
        rol: 'personal',
      },
      {
        nombre: 'Sofía Herrera',
        email: 'sherrera@clubsanmartin.com',
        contrasena: 'personal123',
        rol: 'personal',
      },
      {
        nombre: 'Juan Pérez',
        email: 'jperez@gmail.com',
        contrasena: 'socio123',
        rol: 'socio',
      },
      {
        nombre: 'Ana López',
        email: 'alopez@gmail.com',
        contrasena: 'socio123',
        rol: 'socio',
      },
    ],
  });

  const socios = await prisma.member.createManyAndReturn({
    data: [
      {
        numeroSocio: 1001,
        nombre: 'Juan Pérez',
        dni: '40123456',
        email: 'jperez@gmail.com',
        categoria: 'Activo',
        medioPago: 'Transferencia',
        userId: usuarios[3].id,
        disciplineId: disciplinas[0].id,
      },
      {
        numeroSocio: 1002,
        nombre: 'Ana López',
        dni: '41234567',
        email: 'alopez@gmail.com',
        categoria: 'Activo',
        medioPago: 'Tarjeta',
        userId: usuarios[4].id,
        disciplineId: disciplinas[2].id,
      },
      {
        numeroSocio: 1003,
        nombre: 'Carlos Ruiz',
        dni: '38345678',
        email: 'cruiz@gmail.com',
        categoria: 'Vitalicio',
        medioPago: 'Efectivo',
        disciplineId: disciplinas[1].id,
      },
      {
        numeroSocio: 1004,
        nombre: 'Valentina Sosa',
        dni: '45456789',
        email: 'vsosa@gmail.com',
        categoria: 'Cadete',
        estado: 'moroso',
        medioPago: 'Mercado Pago',
        disciplineId: disciplinas[3].id,
      },
      {
        numeroSocio: 1005,
        nombre: 'Diego Romero',
        dni: '39567890',
        email: 'dromero@gmail.com',
        categoria: 'Activo',
        estado: 'baja',
        medioPago: 'Transferencia',
        disciplineId: disciplinas[4].id,
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        concepto: 'Cuota octubre',
        monto: 15000,
        fecha: new Date('2026-10-05'),
        medio: 'Transferencia',
        estado: 'pagado',
        comprobante: 'TRF-0001',
        memberId: socios[0].id,
      },
      {
        concepto: 'Cuota octubre',
        monto: 11000,
        fecha: new Date('2026-10-07'),
        medio: 'Tarjeta',
        estado: 'pagado',
        comprobante: 'TAR-0002',
        memberId: socios[1].id,
      },
      {
        concepto: 'Cuota octubre',
        monto: 12000,
        fecha: new Date('2026-10-10'),
        medio: 'Efectivo',
        estado: 'pagado',
        memberId: socios[2].id,
      },
      {
        concepto: 'Cuota septiembre',
        monto: 14000,
        fecha: new Date('2026-09-25'),
        medio: 'Mercado Pago',
        estado: 'vencido',
        recargo: 1400,
        memberId: socios[3].id,
      },
      {
        concepto: 'Cuota noviembre',
        monto: 15000,
        fecha: new Date('2026-11-10'),
        medio: 'Transferencia',
        estado: 'pendiente',
        memberId: socios[0].id,
      },
    ],
  });

  await prisma.news.createMany({
    data: [
      {
        titulo: 'Arranca la escuela de fútbol',
        resumen: 'Inscripciones abiertas para inferiores',
        cuerpo:
          'Desde el lunes se abren las inscripciones para todas las categorías de inferiores.',
        categoria: 'Fútbol',
        userId: usuarios[0].id,
      },
      {
        titulo: 'Torneo de básquet',
        resumen: 'El club recibe el torneo regional',
        cuerpo:
          'Este fin de semana se juega el torneo regional de básquet en el estadio cubierto.',
        categoria: 'Básquet',
        userId: usuarios[1].id,
      },
      {
        titulo: 'Nuevo horario de pileta',
        resumen: 'La pileta abre más temprano',
        cuerpo: 'A partir de noviembre la pileta abre a las 7 de la mañana.',
        categoria: 'Natación',
        userId: usuarios[2].id,
      },
      {
        titulo: 'Asamblea de socios',
        resumen: 'Convocatoria a asamblea anual',
        cuerpo: 'Se convoca a todos los socios a la asamblea anual del club.',
        categoria: 'Institucional',
        userId: usuarios[0].id,
      },
      {
        titulo: 'Hockey campeón',
        resumen: 'Las damas ganaron el torneo',
        cuerpo:
          'El equipo de hockey damas se consagró campeón del torneo provincial.',
        categoria: 'Hockey',
        userId: usuarios[1].id,
      },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        titulo: 'Partido de primera',
        descripcion: 'Fecha 10 del torneo',
        fecha: new Date('2026-11-08T17:00:00'),
        lugar: 'Estadio La Ciudadela',
        disciplineId: disciplinas[0].id,
      },
      {
        titulo: 'Final de básquet',
        descripcion: 'Final del torneo regional',
        fecha: new Date('2026-11-09T20:00:00'),
        lugar: 'Estadio cubierto',
        disciplineId: disciplinas[1].id,
      },
      {
        titulo: 'Clínica de vóley',
        fecha: new Date('2026-11-12T18:00:00'),
        lugar: 'Gimnasio principal',
        disciplineId: disciplinas[2].id,
      },
      {
        titulo: 'Torneo de natación',
        descripcion: 'Competencia infantil',
        fecha: new Date('2026-11-15T09:00:00'),
        lugar: 'Pileta olímpica',
        disciplineId: disciplinas[3].id,
      },
      {
        titulo: 'Amistoso de hockey',
        fecha: new Date('2026-11-20T16:00:00'),
        lugar: 'Cancha sintética',
        disciplineId: disciplinas[4].id,
      },
    ],
  });

  await prisma.staff.createMany({
    data: [
      {
        nombre: 'Martín Díaz',
        cargo: 'Entrenador',
        telefono: '3815551001',
        userId: usuarios[1].id,
        disciplineId: disciplinas[0].id,
      },
      {
        nombre: 'Sofía Herrera',
        cargo: 'Profesora',
        telefono: '3815551002',
        userId: usuarios[2].id,
        disciplineId: disciplinas[3].id,
      },
      {
        nombre: 'Roberto Medina',
        cargo: 'Preparador físico',
        telefono: '3815551003',
        disciplineId: disciplinas[1].id,
      },
      {
        nombre: 'Lucía Paz',
        cargo: 'Entrenadora',
        telefono: '3815551004',
        disciplineId: disciplinas[4].id,
      },
      { nombre: 'Jorge Vega', cargo: 'Administrativo', telefono: '3815551005' },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        texto: 'Hola, ¿cuándo vence la cuota?',
        remitenteId: usuarios[3].id,
        destinatarioId: usuarios[0].id,
        leido: true,
      },
      {
        texto: 'Vence el día 10 de cada mes.',
        remitenteId: usuarios[0].id,
        destinatarioId: usuarios[3].id,
      },
      {
        texto: 'Necesito el certificado médico.',
        remitenteId: usuarios[2].id,
        destinatarioId: usuarios[4].id,
      },
      {
        texto: 'Mañana lo llevo, gracias.',
        remitenteId: usuarios[4].id,
        destinatarioId: usuarios[2].id,
      },
      {
        texto: 'Se cambió el horario del entrenamiento.',
        remitenteId: usuarios[1].id,
        destinatarioId: usuarios[0].id,
      },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      { accion: 'crear', tabla: 'members', userId: usuarios[0].id },
      { accion: 'actualizar', tabla: 'payments', userId: usuarios[1].id },
      { accion: 'crear', tabla: 'news', userId: usuarios[0].id },
      { accion: 'eliminar', tabla: 'events', userId: usuarios[2].id },
      { accion: 'iniciar sesión', tabla: 'users', userId: usuarios[3].id },
    ],
  });

  await prisma.file.createMany({
    data: [
      {
        nombre: 'comprobante-octubre.pdf',
        url: 'https://ejemplo.com/archivos/comprobante-octubre.pdf',
        tipo: 'application/pdf',
        userId: usuarios[3].id,
      },
      {
        nombre: 'foto-perfil.jpg',
        url: 'https://ejemplo.com/archivos/foto-perfil.jpg',
        tipo: 'image/jpeg',
        userId: usuarios[4].id,
      },
      {
        nombre: 'apto-medico.pdf',
        url: 'https://ejemplo.com/archivos/apto-medico.pdf',
        tipo: 'application/pdf',
        userId: usuarios[4].id,
      },
      {
        nombre: 'reglamento.pdf',
        url: 'https://ejemplo.com/archivos/reglamento.pdf',
        tipo: 'application/pdf',
        userId: usuarios[0].id,
      },
      {
        nombre: 'torneo-basquet.png',
        url: 'https://ejemplo.com/archivos/torneo-basquet.png',
        tipo: 'image/png',
        userId: usuarios[1].id,
      },
    ],
  });

  console.log('Datos cargados: 5 registros por tabla');
}

cargarDatos()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
