import { FindOneOptionsDto } from '../classes/findone-options.dto';
import { PageMetaDto } from '../classes/page-meta.dto';
import { PageDto } from '../classes/page.dto';
import { SearchOptionsDto } from '../classes/search-options.dto';
import { searchSeparators } from 'config/constants';
import { JoinOptionsInterface } from 'interfaces/join-options.interface';
import * as _ from 'lodash';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';

export function getFindOneOptions<T>(
  where: FindOptionsWhere<T>,
  findOneOptionsDto?: FindOneOptionsDto,
): FindOneOptions<T> {
  return {
    where,
    ...getRelationsOptions(findOneOptionsDto),
  };
}

function getFindManyOptions<T>(
  searchOptionsDto: SearchOptionsDto,
): FindManyOptions<T> {
  return {
    ...getRelationsOptions(searchOptionsDto),
    ...getWhereOptions(searchOptionsDto),
    ...getPaginationOptions(searchOptionsDto),
    ...getOrderByOptions(searchOptionsDto),
  };
}

function getRelationsOptions<T>(
  joinOptions: JoinOptionsInterface,
): FindManyOptions<T> {
  const findOptionsRelations: string[] = [];

  if (joinOptions?.join) {
    joinOptions.join?.split(searchSeparators.criteria).forEach((criteria) => {
      const [entity, joinAttributes] = criteria.split(
        searchSeparators.attribute,
      );

      findOptionsRelations.push(entity);
    });

    return {
      relations: findOptionsRelations,
    };
  }
}

function getWhereOptions<T>(
  searchOptionsDto: SearchOptionsDto,
): FindManyOptions<T> {
  const findOptionsWhere: FindOptionsWhere<T>[] = [];

  searchOptionsDto.filter
    ?.split(searchSeparators.criteria)
    .forEach((criteria) => {
      const [attribute, search] = criteria.split(searchSeparators.attribute);
      const searchTerm: FindOptionsWhere<T> = {};

      _.set(searchTerm, attribute, Like(`%${search}%`));

      findOptionsWhere.push(searchTerm);
    });
  return {
    where: findOptionsWhere,
  };
}

function getPaginationOptions<T>(
  searchOptionsDto: SearchOptionsDto,
): FindManyOptions<T> {
  return {
    skip: searchOptionsDto.skip,
    take: searchOptionsDto.perPage,
  };
}

function getOrderByOptions<T>(
  searchOptionsDto: SearchOptionsDto,
): FindManyOptions<T> {
  const findOptionsOrder: FindOptionsOrder<T> = {};

  searchOptionsDto.sortBy
    ?.split(searchSeparators.criteria)
    .forEach((criteria) => {
      const [attribute, orderDirection] = criteria.split(
        searchSeparators.criteria,
      ) as [string, 'ASC' | 'DESC'];

      findOptionsOrder[attribute] = orderDirection;
    });

  return {
    order: findOptionsOrder,
  };
}

export async function getPaginatedSearchResult<T>(
  searchOptionsDto: SearchOptionsDto,
  repository: Repository<T>,
) {
  const options = getFindManyOptions(searchOptionsDto);
  const [items, itemCount] = await repository.findAndCount(options);
  const pageMetaDto = new PageMetaDto({ itemCount, searchOptionsDto });

  return new PageDto(items, pageMetaDto);
}
