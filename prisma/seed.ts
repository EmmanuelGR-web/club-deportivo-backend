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
  await prisma.paymentMethod.deleteMany();
  await prisma.newsCategory.deleteMany();

  const mediosPago = await prisma.paymentMethod.createManyAndReturn({
    data: [
      { nombre: 'Transferencia' },
      { nombre: 'Tarjeta' },
      { nombre: 'Efectivo' },
      { nombre: 'Mercado Pago' },
      { nombre: 'Débito automático' },
    ],
  });

  const categoriasNoticias = await prisma.newsCategory.createManyAndReturn({
    data: [
      { nombre: 'Institucional' },
      { nombre: 'Fútbol' },
      { nombre: 'Básquet' },
      { nombre: 'Natación' },
      { nombre: 'Hockey' },
    ],
  });

  const disciplinas = await prisma.discipline.createManyAndReturn({
    data: [
      {
        nombre: 'Fútbol',
        descripcion:
          'Categorías desde infantiles hasta primera división, con los profes de la escuela del club.',
        imagen: '/disciplinas/futbol.jpg',
        categorias: 'Infantiles (5 a 12) · Juveniles · Primera',
        dias: 'Lunes a viernes, de 17 a 20 h',
      },
      {
        nombre: 'Básquet',
        descripcion:
          'Mini, formativas y primera, masculino y femenino, en el estadio cubierto.',
        imagen: '/disciplinas/basquet.jpeg',
        categorias: 'Mini (6 a 12) · Formativas · Primera',
        dias: 'Lunes, miércoles y viernes, de 18 a 21 h',
      },
      {
        nombre: 'Vóley',
        descripcion:
          'El equipo femenino juega la final del Apertura. También hay categorías mixtas.',
        imagen: '/disciplinas/voley.jpg',
        categorias: 'Sub-12 · Sub-16 · Primera femenina',
        dias: 'Martes y jueves, de 18 a 21 h',
      },
      {
        nombre: 'Hockey',
        descripcion:
          'Una de las ramas con más jugadoras de la provincia, en cancha sintética.',
        imagen: '/disciplinas/hockey.jpg',
        categorias: 'Sub-8 a Primera · Mamis hockey',
        dias: 'Martes, jueves y sábados',
      },
      {
        nombre: 'Natación',
        descripcion:
          'Escuela de natación y equipo de competición en la pileta climatizada.',
        imagen: '/disciplinas/natacion.jpg',
        categorias: 'Escuelita (4 a 10) · Competición · Adultos',
        dias: 'Lunes a sábado, turnos de 8 a 21 h',
      },
      {
        nombre: 'Tenis',
        descripcion:
          'Clases grupales e individuales en canchas de polvo de ladrillo.',
        imagen: '/disciplinas/tenis.jpeg',
        categorias: 'Infantiles · Juveniles · Adultos',
        dias: 'Todos los días, con turno previo',
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
      {
        nombre: 'Carlos Ruiz',
        email: 'cruiz@gmail.com',
        contrasena: 'socio123',
        rol: 'socio',
      },
      {
        nombre: 'Valentina Sosa',
        email: 'vsosa@gmail.com',
        contrasena: 'socio123',
        rol: 'socio',
      },
      {
        nombre: 'Diego Romero',
        email: 'dromero@gmail.com',
        contrasena: 'socio123',
        rol: 'socio',
      },
      {
        nombre: 'Roberto Medina',
        email: 'rmedina@clubsanmartin.com',
        contrasena: 'personal123',
        rol: 'personal',
      },
      {
        nombre: 'Lucía Paz',
        email: 'lpaz@clubsanmartin.com',
        contrasena: 'personal123',
        rol: 'personal',
      },
      {
        nombre: 'Jorge Vega',
        email: 'jvega@clubsanmartin.com',
        contrasena: 'personal123',
        rol: 'personal',
      },
    ],
  });

  const socios = await prisma.member.createManyAndReturn({
    data: [
      {
        numeroSocio: 1001,
        fechaAlta: new Date('2025-03-10'),
        dni: '40123456',
        userId: usuarios[3].id,
        paymentMethodId: mediosPago[0].id,
      },
      {
        numeroSocio: 1002,
        fechaAlta: new Date('2020-06-15'),
        dni: '41234567',
        userId: usuarios[4].id,
        paymentMethodId: mediosPago[1].id,
      },
      {
        numeroSocio: 1003,
        fechaAlta: new Date('1998-04-01'),
        dni: '38345678',
        userId: usuarios[5].id,
        paymentMethodId: mediosPago[2].id,
      },
      {
        numeroSocio: 1004,
        fechaAlta: new Date('2024-09-20'),
        dni: '45456789',
        estado: 'moroso',
        userId: usuarios[6].id,
        paymentMethodId: mediosPago[3].id,
      },
      {
        numeroSocio: 1005,
        fechaAlta: new Date('2012-02-05'),
        dni: '39567890',
        estado: 'baja',
        userId: usuarios[7].id,
        paymentMethodId: mediosPago[4].id,
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        concepto: 'Cuota octubre',
        monto: 15000,
        fecha: new Date('2026-10-05'),
        paymentMethodId: mediosPago[0].id,
        estado: 'pagado',
        comprobante: 'TRF-0001',
        memberId: socios[0].id,
      },
      {
        concepto: 'Cuota octubre',
        monto: 15000,
        fecha: new Date('2026-10-07'),
        paymentMethodId: mediosPago[1].id,
        estado: 'pagado',
        comprobante: 'TAR-0002',
        memberId: socios[1].id,
      },
      {
        concepto: 'Cuota octubre',
        monto: 15000,
        fecha: new Date('2026-10-10'),
        paymentMethodId: mediosPago[2].id,
        estado: 'pagado',
        memberId: socios[2].id,
      },
      {
        concepto: 'Cuota septiembre',
        monto: 15000,
        fecha: new Date('2026-09-25'),
        paymentMethodId: mediosPago[3].id,
        estado: 'vencido',
        recargo: 150,
        memberId: socios[3].id,
      },
      {
        concepto: 'Cuota noviembre',
        monto: 15000,
        fecha: new Date('2026-11-10'),
        paymentMethodId: mediosPago[0].id,
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
        newsCategoryId: categoriasNoticias[1].id,
        userId: usuarios[0].id,
      },
      {
        titulo: 'Torneo de básquet',
        resumen: 'El club recibe el torneo regional',
        cuerpo:
          'Este fin de semana se juega el torneo regional de básquet en el estadio cubierto.',
        newsCategoryId: categoriasNoticias[2].id,
        userId: usuarios[1].id,
      },
      {
        titulo: 'Nuevo horario de pileta',
        resumen: 'La pileta abre más temprano',
        cuerpo: 'A partir de noviembre la pileta abre a las 7 de la mañana.',
        newsCategoryId: categoriasNoticias[3].id,
        userId: usuarios[2].id,
      },
      {
        titulo: 'Asamblea de socios',
        resumen: 'Convocatoria a asamblea anual',
        cuerpo: 'Se convoca a todos los socios a la asamblea anual del club.',
        newsCategoryId: categoriasNoticias[0].id,
        userId: usuarios[0].id,
      },
      {
        titulo: 'Hockey campeón',
        resumen: 'Las damas ganaron el torneo',
        cuerpo:
          'El equipo de hockey damas se consagró campeón del torneo provincial.',
        newsCategoryId: categoriasNoticias[4].id,
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
        disciplineId: disciplinas[4].id,
      },
      {
        titulo: 'Amistoso de hockey',
        fecha: new Date('2026-11-20T16:00:00'),
        lugar: 'Cancha sintética',
        disciplineId: disciplinas[3].id,
      },
    ],
  });

  await prisma.staff.createMany({
    data: [
      {
        cargo: 'Entrenador',
        telefono: '3815551001',
        userId: usuarios[1].id,
      },
      {
        cargo: 'Profesora',
        telefono: '3815551002',
        userId: usuarios[2].id,
      },
      {
        cargo: 'Preparador físico',
        telefono: '3815551003',
        userId: usuarios[8].id,
      },
      {
        cargo: 'Entrenadora',
        telefono: '3815551004',
        userId: usuarios[9].id,
      },
      {
        cargo: 'Administrativo',
        telefono: '3815551005',
        userId: usuarios[10].id,
      },
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

  console.log('Datos cargados: al menos 5 registros por tabla');
}

cargarDatos()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
