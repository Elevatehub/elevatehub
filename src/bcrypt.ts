/* eslint-disable prettier/prettier */
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

export async function encodePassword(password: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hashSync(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export interface tokenJwt {
  id: string;
}

export async function generateUUID() { // Public Domain/MIT
  let d = new Date().getTime();//Timestamp
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;//random number between 0 and 16
    if (d > 0) {//Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export async function extractTokenFromHeader(
  request: Request,
): Promise<tokenJwt> {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  const items = type === 'Bearer' ? token : undefined;
  return { id: parseJwt(items).id }
}

export async function checkBlacklist(req: Request, userService: any, blacklist) {
  const header: tokenJwt = await extractTokenFromHeader(req);
  // console.log(header.id)
  const checkRole = await userService.findOne(header.id);
  if (checkRole.idRole === blacklist) {
    throw new InternalServerErrorException(
      'Your are not allowed access this API',
    );
  }
  return
}