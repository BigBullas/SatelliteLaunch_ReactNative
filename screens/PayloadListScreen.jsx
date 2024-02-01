import { View, ScrollView, StyleSheet, TextInput, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api';
import { setLoadCapacityEnd, setLoadCapacityStart, setSearchValue } from '../store/filterSlice'
import { setPayloads } from '../store/payloadSlice';
import PayloadCard from '../components/PayloadCard';
import Breadcrumbs from '../components/Breadcrumbs';


export default function PayloadListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { payloads } = useSelector((store) => store.payload);
    const { searchValue, loadCapacityStart, loadCapacityEnd } = useSelector((store) => store.filter);

    const [ searchValueFilter, setSearchValueFilter] = useState(searchValue);
    const [loadCapacityStartFilter, setLoadCapacityStartFilter] = useState(0);
    const [loadCapacityEndFilter, setLoadCapacityEndFilter] = useState(500);
    const [ searchFlag, setSearchFlag ] = useState(false);

    // const [flightDateStart, setFlightDateStart] = useState('');
    // const [flightDateEnd, setFlightDateEnd] = useState('');

    useEffect(() => {
        async function getAllPayloads() {
            let flag = false;
            let query = '';

            if (searchValue) {
                query += `space_satellite=${ searchValue }&`;
                flag = true;
            }

            if (loadCapacityStart) {
                query += `load_capacity_start=${ loadCapacityStart }&`;
                flag = true;
            }

            if (loadCapacityEnd) {
                query += `load_capacity_end=${ loadCapacityEnd }&`;
                flag = true;
            }

            // if (flightDateStart) {
            //     query += `flight_date_start=${ flightDateStart }&`;
            //     flag = true;
            // }

            // if (flightDateEnd) {
            //     query += `flight_date_end=${ flightDateEnd }&`;
            //     flag = true;
            // }

            if (flag) {
                query = `/payloads?` + query;
            } else {
                query = `/payloads`;
            }

            await axiosInstance.get(query)
            .then((response) => {console.log(response?.data?.payloads); dispatch(setPayloads(response?.data?.payloads))})
            .catch((err) => console.log(err));
        }
        getAllPayloads();
    }, [dispatch, searchFlag]);

    const onBtnPress = () => {
        dispatch(setSearchValue(searchValueFilter));
        dispatch(setLoadCapacityStart(loadCapacityStartFilter));
        dispatch(setLoadCapacityEnd(loadCapacityEndFilter));
        setSearchFlag(!searchFlag);
    }

    // const handleFlightDateStart = (event) => {
    //     setFlightDateStart(event.target.value)
    // }

    // const handleFlightDateEnd = (event) => {
    //     setFlightDateEnd(event.target.value)
    // }

    const handleLoadCapacityStart = (e) => {
        setLoadCapacityStartFilter(e);
    }

    const handleLoadCapacityEnd = (e) => {
        setLoadCapacityEndFilter(e);
    }

   return (
        <ScrollView style={styles.body}>
            <Breadcrumbs pages={[]} navigation={navigation}/>
            <View style={styles.payloadListContainer}>
                <View style={styles.listOptions}>
                    <View style={{flexDirection: 'row', marginVertical: '1em', justifyContent: 'space-between', width: '350px' }}>
                        <TextInput
                        style={styles.inputSearch}
                        placeholder="Введите название КА"
                        onChangeText={ (e) => setSearchValueFilter(e) }
                        value={ searchValueFilter }
                        />
                        <Button title="Найти" onPress={ onBtnPress } color={ '#9048F0' }/>
                    </View>
                    <View style={styles.filterContainer}>
                        <View style={styles.filterLabel}>
                            <Text>Вес, т:</Text> 
                        </View>
                        <View style={styles.filterInputContainer}>
                            <View>
                                <TextInput
                                style={styles.inputFilter}
                                keyboardType="numeric"
                                placeholder='0'
                                value={ loadCapacityStartFilter }
                                onChangeText={ handleLoadCapacityStart }
                                />
                            </View>
                            <View style={{padding: '0.3em 1em 0 1em' }}><Text> - </Text></View>
                            <View>
                                <TextInput
                                style={styles.inputFilter}
                                keyboardType="numeric"
                                placeholder='500'
                                value={ loadCapacityEndFilter }
                                onChangeText={ handleLoadCapacityEnd }
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {payloads && payloads.length > 0 ?
                    <View style={styles.cardContainer}>
                         {!!payloads &&
                            payloads.map((payload) => <PayloadCard key={payload.payload_id} props = {payload} navigation={navigation} />)}
                    </View> :
                    <View style={{textAlign: 'center', padding: '3em 0 3em 0'}}>
                        <Text>Ничего не найдено</Text>
                    </View>
                }   
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: '1em',
    },

    body: {
        backgroundColor: '#ECE9F2',
    },

    listOptions: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'left',
        paddingHorizontal: '1em',
    },

    inputSearch: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
    },

    inputFilter: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: '120px',
    },

    btnFind: {
        flexGrow: 0.3,
        backgroundColor: '#9048F0',
        borderColor: '#9048F0',
        borderRadius: 5,
        padding: 7,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
    },

    filterContainer: {
        flexDirection: 'row',
        alignItems: 'left',
        width: '350px',
    },

    filterLabel: {
        padding: 0,
        paddingRight: '1em',
    },

    filterInputContainer: {
        flexDirection: 'row',
    },
});
