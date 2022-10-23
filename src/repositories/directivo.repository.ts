import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Directivo, DirectivoRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class DirectivoRepository extends DefaultCrudRepository<
  Directivo,
  typeof Directivo.prototype.id,
  DirectivoRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Directivo.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Directivo, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
