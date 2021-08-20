import Route from '@ioc:Adonis/Core/Route'

Route.get('type/professional', 'ProfessionalTypesController.index');
Route.get('type/professional/:id', 'ProfessionalTypesController.show');
Route.post('type/professional', 'ProfessionalTypesController.store');
Route.put('type/professional/:id', 'ProfessionalTypesController.update');
Route.delete('type/professional/:id', 'ProfessionalTypesController.destroy');

Route.get('professional', 'ProfessionalsController.index');
Route.get('professional/:id', 'ProfessionalsController.show');
Route.post('professional', 'ProfessionalsController.store');
Route.put('professional/:id', 'ProfessionalsController.update');
Route.delete('professional/:id', 'ProfessionalsController.destroy');


