import { ModelStatic } from 'sequelize';
import { IPlacesToGo, IServicePlaces } from '../interfaces';
import Places from '../../database/models/PlacesToGoModel';
import Country from '../../database/models/CountryModel';

class PlacesService implements IServicePlaces {
  protected model: ModelStatic<Places> = Places;

  static formatPlaces(places: IPlacesToGo[]) {
    const formatedPlaces = places.map((place) => {
      const handleMeta = place.meta.split('-');
      const formatedMeta = `${handleMeta[0]}-${handleMeta[1]}`
      place.meta = formatedMeta;
      return place
    });

    return formatedPlaces;
  }

  async getAll(): Promise<IPlacesToGo[]> {
    const places = await this.model.findAll({
      include: [
        {
          model: Country,
          as: 'country',
          attributes: { exclude: ['id'] },
        },
      ],
      order: [['meta', 'ASC']],
    });

    const formatedPlaces = PlacesService.formatPlaces(places)
    return formatedPlaces;
  }

  async create(place: IPlacesToGo): Promise<IPlacesToGo> {
    const { countryId, placeName, meta } = place;
    const handleMeta = meta.split('/');
    const formatedMeta = `${handleMeta[1]}-${handleMeta[0]}-01`
    const currentDate = new Date();
    
    const newPlace = await this.model.create({
      countryId,
      placeName,
      meta: formatedMeta,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    return newPlace;
  }

  async update(place: IPlacesToGo): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<[affectedCount: number]> {
    throw new Error('Method not implemented.');
  }
}

export default PlacesService;
