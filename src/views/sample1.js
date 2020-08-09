import React, { useState } from 'react';
import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';
import QueryBuilder from 'react-querybuilder';

export default function Sample1() {
  const fields = [
    { name: '${0}', label: 'Address Id' },
    { name: '${1}', label: 'Status Confirmed' },
    { name: '${2}', label: 'Status delivered' },
    { name: '${3}', label: 'orderAt' },
    { name: '${4}', label: 'deliveredBy' },
    { name: '${5}', label: 'totalAmount' },
    { name: '${6}', label: 'coupenCode' },
    { name: '${7}', label: 'userId' },
    { name: '${8}', label: 'itemId' },
    { name: '${9}', label: 'availabilityId' },
    { name: '${10}', label: 'amount' },
    { name: '${11}', label: 'quantity' }
  ];
  const operators = [
    { name: 'EQ', label: '= (Equals)' },
    { name: 'NE', label: '!= (Not Equals)' },
    { name: 'GT', label: '< (Less Than)' },
    { name: 'LT', label: '> (Greater Than)' },
    { name: 'LE', label: '<= (Less Than or Equal to)' },
    { name: 'GE', label: '>= (Greater Than or Equal to)' },
    { name: '+', label: '+ (Add)' },
    { name: '-', label: '- (Subtract)' },
    { name: '*', label: 'X (Multiply)' },
    { name: '/', label: '/ (Divide)' }
  ];

  const combinators = [
    { name: '&&', label: 'AND' },
    { name: '||', label: 'OR' },
    { name: '=', label: '= (Resulting Value)' }
  ];
  function logQuery(query) {
    console.log(query);
  }
  const getValues = (field, operator) => {
    switch (field) {
      case 'firstName':
        return [
          { name: 'Guitar', label: 'Guitar' },
          { name: 'Piano', label: 'Piano' },
          { name: 'Vocals', label: 'Vocals' },
          { name: 'Drums', label: 'Drums' }
        ];

      case 'lastName':
        return [
          { name: 'M', label: 'Male' },
          { name: 'F', label: 'Female' },
          { name: 'O', label: 'Other' }
        ];
      case 'isDev':
        return [
          { name: 'M', label: 'Male' },
          { name: 'F', label: 'Female' },
          { name: 'O', label: 'Other' }
        ];
      default:
        return [];
    }
  };

  const getOperators = (field) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
        return [{ name: 'EQ', label: '= (Equals)' }];

      default:
        return null;
    }
  };

  const getValueEditorType = (field, operator) => {
    switch (field) {
      case 'isDev':
        return 'radio';

      case 'firstName':
        return 'select';

      case 'isMusician':
        return 'checkbox';

      default:
        return 'text';
    }
  };

  const getInputType = (field, operator) => {
    switch (field) {
      case 'age':
        return 'number';

      default:
        return 'text';
    }
  };

  return (
    <QueryBuilder fields={fields}
      operators={operators}
      combinators={combinators}
      onQueryChange={logQuery}
      // showCombinatorsBetweenRules={true}
      getOperators={getOperators}
      getValueEditorType={getValueEditorType}
      getInputType={getInputType}
      getValues={getValues} />
  )
}
