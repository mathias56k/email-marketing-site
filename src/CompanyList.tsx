import React from 'react';

const CompanyList = ({ tableName, changeTableName }) => {
  return (
    <>
      <p>Selected table: {tableName}</p>
      <a className='font-black cursor-pointer' onClick={() => changeTableName('LIDL')}>LIDL</a>
      <br></br>
      <a className='font-black cursor-pointer' onClick={() => changeTableName('Hatch Embroidery Registration')}>Hatch</a>
    </>
  );
}

export default CompanyList;