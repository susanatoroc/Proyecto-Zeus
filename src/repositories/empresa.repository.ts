import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Cliente, Orden} from '../models';
import {OrdenRepository} from './orden.repository';
import {ClienteRepository} from './cliente.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id,
          Orden,
          typeof Empresa.prototype.id
        >;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('OrdenRepository') protected ordenRepositoryGetter: Getter<OrdenRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Empresa, dataSource);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, ordenRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
