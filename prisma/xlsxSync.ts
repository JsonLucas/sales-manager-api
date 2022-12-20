import xlsx from "node-xlsx";
import { prisma } from "../src/utils/prisma";
import { Crypt } from "../src/helpers/crypt";
import { ISeedEmployee } from "../src/interfaces/entities/employee";
import { ISeedBoard } from "../src/interfaces/entities/board";
import { ISeedUnity } from "../src/interfaces/entities/unity";
import { ISeedSales } from "../src/interfaces/entities/sales";

export const seedDataFromXlsx = async () => {
  let coordinatesIndex,
    boardNameIndex,
    employeeNameIndex,
    emailindex,
    unityNameIndex,
    positionName,
    bodyEmployee,
    bodyBoard,
    bodyUnity,
    bodySale;
  const { data } = xlsx.parse(`${__dirname}/dados-do-projeto.xlsx`)[0];
  const voidIndexes = findVoids(data);
  const formatedArray = fillFormatedArray(voidIndexes, data);
  for (let i of formatedArray) {
    for (let j in i) {
      if (i[j].find((item: string) => item === "Diretor Geral")) {
        employeeNameIndex = i[j].indexOf("Diretor Geral");
        emailindex = i[j].indexOf("E-mail");
        positionName = i[j][employeeNameIndex];
      } else if (i[j].find((item: string) => item === "Diretor")) {
        employeeNameIndex = i[j].indexOf("Diretor");
        emailindex = i[j].indexOf("E-mail");
        boardNameIndex = i[j].indexOf("Nome Diretoria");
        positionName = i[j][employeeNameIndex];
      } else if (i[j].find((item: string) => item === "Gerente")) {
        employeeNameIndex = i[j].indexOf("Gerente");
        emailindex = i[j].indexOf("E-mail");
        coordinatesIndex = i[j].indexOf("Lat_Lon");
        boardNameIndex = i[j].indexOf("Diretoria");
        unityNameIndex = i[j].indexOf("Unidade");
        positionName = i[j][employeeNameIndex];
      } else if (i[j].find((item: string) => item === "Vendedor")) {
        employeeNameIndex = i[j].indexOf("Vendedor");
        emailindex = i[j].indexOf("E-mail");
        unityNameIndex = i[j].indexOf("Unidade");
        positionName = i[j][employeeNameIndex];
      } else {
        bodyEmployee = {
          email: i[j][emailindex],
          name: i[j][employeeNameIndex],
          positionName,
        };
        const { id } = await seedEmployee(bodyEmployee);
        switch (positionName) {
          case "Diretor":
            bodyBoard = { name: i[j][boardNameIndex], principalId: id };
            await seedBoard(bodyBoard);
            break;
          case "Gerente":
            bodyUnity = {
              name: i[j][unityNameIndex],
              managerId: id,
              boardName: i[j][boardNameIndex],
              coordinates: i[j][coordinatesIndex],
            };
            await seedUnity(bodyUnity);
            break;
          case "Vendedor":
            bodySale = { employeeId: id, unityName: i[j][unityNameIndex] };
            await seedSales(bodySale);
            break;
          default:
            break;
        }
      }
    }
  }
};

const findVoids = (array: Array<any>) => {
  let voidIndexes = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 0) {
      voidIndexes.push(i);
    }
  }
  return voidIndexes;
};

const fillFormatedArray = (voidIndexes: Array<number>, content: Array<any>) => {
  let formated = [],
    lastIndex = 0;
  for (let i = 0; i < content.length; i++) {
    if (voidIndexes.find((item) => i === item)) {
      formated.push(content.slice(lastIndex, i));
      lastIndex = i + 1;
      voidIndexes.shift();
    }
  }
  if (voidIndexes.length === 0) {
    formated.push(content.slice(lastIndex, content.length));
  }
  return formated;
};

const seedEmployee = async (content: ISeedEmployee) => {
  const crypt = new Crypt();
  const password = await crypt.encode("123mudar");
  const { name, email, positionName } = content;
  const employee = await prisma.employees.findUnique({ where: { email } });
  if (!employee) {
    const { id } = await prisma.positions.findUnique({
      where: { name: positionName },
    });
    const body = { name, email, password, positionId: id };
    return await prisma.employees.create({ data: { ...body } });
  }
  return employee;
};

const seedBoard = async (content: ISeedBoard) => {
  const { name, principalId } = content;
  const body = { name, principalId };
  const board = await prisma.boards.findUnique({ where: { name } });
  if (!board) await prisma.boards.create({ data: { ...body } });
};

const seedUnity = async (content: ISeedUnity) => {
  const { name, boardName, coordinates, managerId } = content;
  const board = await prisma.boards.findUnique({ where: { name: boardName } });
  const body = { name, coordinates, managerId, boardId: board.id };
  const unity = await prisma.unities.findUnique({ where: { name } });
  if (!unity) await prisma.unities.create({ data: { ...body } });
};

const seedSales = async (content: ISeedSales) => {
  const { employeeId, unityName } = content;
  const unity = await prisma.unities.findUnique({ where: { name: unityName } });
  const body = {
    employeeId,
    unityId: unity.id,
    coordinates: unity.coordinates,
    value: 100,
    saleDate: new Date(),
  };
  await prisma.sales.create({ data: { ...body } });
};

export const seedPositions = async () => {
  await prisma.positions.create({ data: { name: "Diretor Geral" } });
  await prisma.positions.create({ data: { name: "Diretor" } });
  await prisma.positions.create({ data: { name: "Gerente" } });
  await prisma.positions.create({ data: { name: "Vendedor" } });
};

(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE positions RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE boards RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE employees RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE unities RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE sales RESTART IDENTITY CASCADE;`;

  await seedPositions();
  await seedDataFromXlsx();
  console.log("data sync complete");
})();
