import React from 'react'
import { Bar } from 'react-chartjs-2';
import '../charts/BestSell.css'
import Chart from 'chart.js/auto';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Home from '../home/Home';
import Navalert from '../navalert/Navalert';
export default function Bestsell(props) {
    const allmonth = ["January", "February", "March", "April", "May", 'June', "July", "August", "September", "October", "November", "December"]
    const [years, setYears] = useState([]);
    const [data, setData] = useState([]);
    const [commands, setCommands] = useState([]);
    const [allproducts, setAllproducts] = useState([]);
    const [allproduct, setallproduct] = useState([]);
    const [allitems, setAllItems] = useState([])
    const [wilayas, setWilaya] = useState([])
    const [name_products, setNameproduct] = useState([])
    const [show_stat_product, setShowStatProduct] = useState(false);
    const [all_qutes, setAllQtes] = useState([])
    const [extractallselledproduct, setExtractallselledproduct] = useState([])
    const [month, setMonth] = useState([]);
    const [show, setShow] = useState(false);
    const [show_chart_month, setShowChartMonth] = useState(false);
    const [show_options, setShowOptions] = useState(false);
    const [show_month, setShowMonth] = useState(false);
    const [show_year, setShowYear] = useState(false);
    const [monthValue, setMonthValue] = useState("");
    const [show_state, setShowState] = useState(false);
    const [total_CA, setTotalca] = useState([]);
    const [total_CA_Month, setTotalcamonth] = useState([]);
    const year_value = document.querySelector("#select");
    const [yearvalue, setYearValue] = useState();
    const [tr, setTr] = useState([]);
    const [summ, setSumm] = useState([]);
    const [ nonselledproduct, setNonselledproduct] = useState([]);
    const [less_selled_product, setlessselledproduct] = useState([]);
    const min_qte = 2;
    const [sellsdatamonth, setSellsdatamonth] = useState({
        labels: total_CA_Month,
        datasets: [{
            label: "ventes par mois",
            data: month
        }]
    });
    let sum = 0;
    const [sellsdata, setSellsdata] = useState({
        labels: years,
        datasets: [{
            label: "ventes par année",
            data: total_CA
        }]
    });

    const [best_sell_month, setBestSellMonth] = useState({});
    const [best_sell_wilaya, setBestSellWilaya] = useState({});

    const getAllCommands = () => {
        axios.get(`${process.env.REACT_APP_LINK}/command/get-commend`, {
            headers: {
                'x-access-token': Cookies.get("refreshtoken"),
            }
        }).then((res) => {
            setData([])
            for (let i = 0; i <= ((res.data.data).length) - 1; i++) {
                const element = (res.data).data[i];
                data.push(element);
            }
            setCommands(res.data.data);
            console.log(JSON.parse(res.data.data[1].list))
            setExtractallselledproduct(res.data.data);


            // console.log(JSON.parse(res.data.data[0]))
        })
    }

     const getallproducts = () => {
        axios.get(`${process.env.REACT_APP_LINK}/product/get`, {
            headers: {
                'x-access-token': Cookies.get("refreshtoken"),
            }
        }).then((res) => {
            setallproduct(res.data.data);
            console.log(JSON.parse(res.data.data))
        })
     }


     const getlessselledprodduct = () => {

        /*
        extractallselledproduct.map((selledproduct)=> {
            allproduct.map((products)=> {
                if(JSON.parse(selledproduct.list).name != products ) {
  nonselledproduct.push(products)
                }
            })
        })*/
      let  arr= []
     let count = 0;
   //  console.log(extractallselledproduct)

   extractallselledproduct.map((selledelm) => {
    console.log( JSON.parse(selledelm.list))
    JSON.parse(selledelm.list).map((elm)=> {
     arr.push(elm)
  /*      allproduct.map((product)=> {
            
            if(elm.name != product.name) {
                arr.push(product.name)
            }
          
        })*/
       
    })
})

arr.map((elm)=> {
allproduct.map((product)=> {
    if(elm.name != product.name) {
        console.log(product.name)
    }
})
})
    }

    const extractData = () => {
        getAllCommands();
        getallproducts();
    }

    const getYearsmonth = () => {
        const arr = []
        commands.map((elm) => {
            years.push((elm.date.split(' /'))[2])
            month.push((elm.date.split(' /'))[1])
            setYears([... new Set(years)])
            setMonth([... new Set(month)])
        })
    }

    const getSelectValue = () => {
        var select = document.getElementById('select');
        setYearValue(select.options[select.selectedIndex].text);
        setShowChartMonth(true)
        //  handleCAMonth(select.options[select.selectedIndex].text);
        //  setShowChartMonth(true)
        //  setShow(false)
        handleCAMonth(select.options[select.selectedIndex].text)
        /* setSellsdatamonth({
             labels: total_CA_Month,
             datasets: [{
                 label: "ventes par mois",
                 data: month
             }]});*/
    }

    const getMonthValue = () => {
        var select = document.getElementById('select1');
        const index = allmonth.indexOf(select.options[select.selectedIndex].text);
        setMonthValue(select.options[select.selectedIndex].text)
    }

    const getallproduct = () => {
        // select products of the month
        var select = document.getElementById('select1');
        const index = allmonth.indexOf(select.options[select.selectedIndex].text);
        const product_of_month = commands.filter((elm) => (elm.date.toString().split(' /'))[1].trim() === index.toString())
        // console.log(product_of_month)
        product_of_month.map((elm) => {
            JSON.parse(elm.list).map((element) => {
                allitems.push(element)
                allproducts.push(element.name)
                all_qutes.push(element.qte)
            })
        })

        allproducts.map((elm, index) => {
            if (allproducts.indexOf(elm) !== index) {
                all_qutes[allproducts.indexOf(elm)] = all_qutes[allproducts.indexOf(elm)] + all_qutes[index];
                all_qutes[index] = 0
            }
        })

        setBestSellMonth({
            labels: [...new Set(allproducts)],
            datasets: [{
                label: "ventes par année",
                data: all_qutes.filter((elm) => elm !== 0)
            }]
        })
    }

    // **** CA PER MONTH
    const handleCAMonth = (year) => {
        sum = 0
        // EXTRACT MONTHS 
        commands.map((elm) => {
            if (year.trim() === (((elm.date.toString().split(' /'))[2]).trim())) {
                tr.push(elm.date.toString().split(' /')[1]);
            }

            /*
              allmonth.map((month) => {
                  if ((allmonth.indexOf(month)).toString() === (((elm.date.toString().split(' /'))[1]).trim()) && year.trim() === (((elm.date.toString().split(' /'))[2]).trim())) {
                      sum = sum + elm.total;
                      total_CA_Month.push(sum)
                  }
                  else {
                      sum = 0;
                      total_CA_Month.push(sum)
                  }
              })*/
        })
        setMonth([... new Set(tr)])
        // GET CA FOR THIS MONTHS
        let summm = []

        tr.map((elmt) => {
            let sum = 0
            commands.map((elm) => {
                if ((elm.date.toString().split(' /'))[1] === elmt && year.trim() === (((elm.date.toString().split(' /'))[2]).trim())) {
                    sum = sum + elm.total;
                }
            })
            summ.push(JSON.stringify(sum))
        })

        // setShowChartMonth(true)
        setTotalcamonth([... new Set(summ)])
    }

    const handleCAYear = () => {
        setShowChartMonth(true)
        years.map((year) => {
            commands.map((elm) => {
                if (year.trim() === (((elm.date.toString().split(' /'))[2]).trim())) {
                    sum = sum + elm.total
                }
                else {
                    sum = 0;
                }
            })
            total_CA.push(sum)
        })
    }

    const geolocateSells = () => {
        commands.map((elm) => {
            JSON.parse(elm.list).map((element) => {
                name_products.push(element.name)
                wilayas.push(elm.wilaya)
            })
        })

        name_products.map((elm, index) => {
            if (name_products.indexOf(elm) !== index) {
                wilayas[index] = 0
            }
        })

        setBestSellWilaya({
            labels: [...new Set(name_products)],
            datasets: [{
                label: "ventes par wilaya",
                data: wilayas.filter((elm) => elm !== 0)
            }]
        })
    }

    useEffect(() => {
        if (monthValue) {
            getallproduct();
            setShowStatProduct(true)
        }
        console.log(allproducts)
        console.log(commands)
    }, [monthValue])

    useEffect(() => {
        if (year_value) {

            setSellsdatamonth({
                labels: total_CA_Month,
                datasets: [{
                    label: "ventes par mois",
                    data: month
                }]
            });
        }
    }, [year_value])

    useEffect(() => {
        getAllCommands()
        extractData()
        const full_date = new Date();
        const date = `${full_date.getDate()} / ${full_date.getMonth()} / ${full_date.getFullYear()}`;
    }, [])

    return (
        <div className='stat-container'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='chart-content'>
                <div> <Navalert /> </div>
                {!show_options && <div className='stat-commands-container'>
                    <button onClick={() => { getYearsmonth(); console.log(years); geolocateSells(); setShowOptions(true); }} className='start-stat-button'> Commencer les statistiques </button>
                </div>}
                {show_options &&
                    <div className='stat-buttons'>
                        <button onClick={() => { setShowChartMonth(false); setShowMonth(false); setShow(true); handleCAYear(); setShowState(false); setShowStatProduct(false); setShowMonth(false); setShowYear(false); setShowChartMonth(false) }} className='stat-button'> Nombre de ventes par année </button>
                        <button onClick={() => { setShow(false); setShowChartMonth(false); setShowYear(true); setShowState(false); setShowMonth(false); setShowStatProduct(false) }} className='stat-button'> Nombre de ventes par mois </button>
                        <button onClick={() => { geolocateSells(); setShowState(true); setShowChartMonth(false); setShowStatProduct(false); setShowMonth(false); setShow(false); setShowYear(false) }} className='stat-button'> Produit par wialyas </button>
                    </div>}
                {show && <div className='chart-container'>
                    {years && total_CA && <Bar data={sellsdata} className='bar-chart' />}
                </div>
                }

                <div className='chart-container'>
                    {show_year && <select id='select' onChange={() => getSelectValue()}>
                        <option value={"choose"}> Selectionner l'année </option>
                        {years && years.map((elm) => {
                            return (
                                <option value={elm}> {elm} </option>
                            )
                        })}
                    </select>}

                    {show_month && <select id='select1' onChange={() => { getallproduct(); setShowStatProduct(true) }}>
                        <option> Selectioner un mois</option>
                        {allmonth.map((elm) => {
                            return (
                                <option> {elm} </option>
                            )

                        })}
                    </select>}
                </div>

                {show_chart_month &&
                    <div className='chart-container'>  <Bar data={sellsdatamonth} className='bar-chart' /> </div>}

                {show_stat_product && <Bar data={best_sell_month} className='bar-chart' />}
                <div>
                    {show_state && <Bar data={best_sell_wilaya} className='bar-chart' />}
                </div>
            </div>

        </div>
    )
}
