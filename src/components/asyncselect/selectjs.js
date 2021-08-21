import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import _ from "lodash";



const SelectAsyncPaginate = ({ url, valueparent, onChangeSelect, placeholder='', condition = ''}) => {
  const [value, setValue] = useState();
  const [conditional, setConditional] = useState({});
  

  useEffect(() => {
    setValue(valueparent);
  }, [valueparent]);

  useEffect(() => {
    setValue({});
    setConditional(condition);
    loadOptions('', [], 1);
  }, [condition]);

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const querycondition = _.trim(conditional) == '' ? '' : `&condition=${conditional}`;
    const query = _.isEmpty(searchQuery) ? '' : `&query=${searchQuery}`;
    const nextpage = `${url}?page=${page}${query}${querycondition}`
    const response = await fetch(nextpage)
    let responseJSON = await response.json();

    return {
      options: responseJSON.data,
      hasMore: responseJSON.meta.current_page < responseJSON.meta.last_page,
      additional: {
        page: page + 1,
      },
    };
  };

  const onChange = (option) => {
    if (_.isFunction(onChangeSelect)) {
      onChangeSelect(option);
    }
  };

  return (
    <AsyncPaginate
      key={JSON.stringify(condition)}
      value={value}
      loadOptions={loadOptions}
      onChange={onChange}
      isSearchable={true}
      placeholder={placeholder}
      additional={{
        page: 1,
      }}
    />
  );
};


export default SelectAsyncPaginate;