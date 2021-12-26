
import css from './ContactList.module.css';

import { LinearProgress } from '@material-ui/core';
import { ContactListItem } from 'Components/ContactListItem/ContactListItem';
import { EditModal } from 'Components/EditModal/EditModal';
import { getFiltredContacts } from 'utils/getFiltredContacts';
import toast from 'react-hot-toast';

import { useEffect, useState } from 'react';

import { getFilterValue } from 'redux/selectors';

import { useGetContactQuery } from 'redux/contactApiServise';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { isOpen } from 'redux/actions';

const ContactList = () => {
  const { data, isFetching, error } = useGetContactQuery();
  const filterValue = useSelector(getFilterValue);
  const fitredContacts = getFiltredContacts(data, filterValue);
  const isOpenModal = useSelector(s => s.isOpenModal);
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState('');

  useEffect(() => {
    error &&
      toast.error(`Возникла ошибка ${error.status}, сообщение ${error.data}`);
  }, [error]); 

  const editButtonHandler = contact => () => {
    dispatch(isOpen());
    setModalData(contact);
  };

  return (
    <>
      <h2 className={css.header}>Your contacts</h2>
      {isFetching && <LinearProgress style={{ marginTop: '20px' }} />}
      <ul className={css.list}>
        {fitredContacts.map(contact => {
          return (
            <ContactListItem
              contact={contact}
              key={contact.id}
              editButtonHandler={editButtonHandler}
            />
          );
        })}
      </ul>
      {isOpenModal && <EditModal data={modalData} />}
    </>
  );
};

export default ContactList;