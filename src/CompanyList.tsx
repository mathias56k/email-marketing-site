import React from 'react';

const CompanyList = ({ tableName, changeTableName }) => {
  return (
    <div className='bg-red-500 text-xl font-main flex flex-col items-center p-10 gap-2.5'>
      <h2 className='font-bold bg-blue-500'>Vali kelle meile soovid näha</h2>
      <div className='bg-yellow-500 w-3/4 h-10 flex justify-center items-center rounded'><a className='font-semibold cursor-pointer bg-blue-300 text-xl' onClick={() => changeTableName('LIDL')}>LIDL</a></div>
      <div className='bg-gray-500 w-3/4 h-10 flex justify-center items-center rounded'><a className='font-semibold cursor-pointer bg-blue-300 text-xl' onClick={() => changeTableName('Hatch Embroidery Registration')}>HATCH</a></div>
    </div>
  );
}

export default CompanyList;