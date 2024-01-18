import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
  private readonly cats: { name: string }[] = [];

  create(cat: { name: string }) {
    this.cats.push(cat)
  }

  findAll(): { name: string }[] {
    return this.cats
  }
}
