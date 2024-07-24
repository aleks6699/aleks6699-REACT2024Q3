import { People } from '../App';
function convertToCSV(items: People[]) {
  const headers = ['Name', 'URL', 'Skin', 'Eye', 'Gender', 'Mass', 'Height'];
  const rows = items.map((item) => [
    item.name,
    item.url,
    item.skin_color,
    item.eye_color,
    item.gender,
    item.mass,
    item.height,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
  return encodeURI(csvContent);
}

export default convertToCSV;
