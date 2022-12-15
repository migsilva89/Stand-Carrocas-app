import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import HomePageHeader from '../components/HomePageHeader'
import BrandsSlide from '../components/BrandsSlide'
import CardComponent from '../components/CardComponent'
import Modal from '../components/Modal'

function HomePage(props) {
  const lastFourAdded = props.data.slice(-4)
  const [carsToCompare, setCarsToCompare] = useState([])
  const [isReadyToCompare, setIsReadyToCompare] = useState(false)
  const [filteredCarsToCompare, setFilteredCarsToCompare] = useState([])

  const handleCompareModal = () => {
    if (carsToCompare.length == 2) {
      setIsReadyToCompare(true)
      getCarsToCompare(carsToCompare[0], carsToCompare[1])
    }
  }

  useEffect(() => {
    handleCompareModal()
  }, [carsToCompare])

  function getCarsToCompare(car1, car2) {
    let updatedCars = []
    props.data.filter((car) => {
      if (
        car.numerodechassi.toLowerCase() === car1 ||
        car.numerodechassi.toLowerCase() === car2
      ) {
        updatedCars.push(car)
      }
    })
    setFilteredCarsToCompare(updatedCars)
  }

  return (
    <MainLayout>
      <HomePageHeader />
      <section className="max-w-7xl mx-auto font-semibold py-10 mb-auto w-full px-12">
        <h1 className="text-blue-900 md:text-5xl text-4xl text-center pb-10 font-medium lg:leading-snug">
          <span className="text-blue-500">|</span> Latest added{' '}
          <span className="text-blue-500">|</span>
        </h1>
        <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-7">
          {lastFourAdded.map((car, index) => (
            <CardComponent
              key={index}
              carName={car.marca}
              carImgs={car.imagens}
              year={car.anofabrico}
              price={car.preco}
              id={index + 1}
              fuel={car.combustivel}
              doors={car.portas}
              slug={car.numerodechassi.toLowerCase()}
              setCarsToCompare={setCarsToCompare}
              carsToCompare={carsToCompare}
              setIsReadyToCompare={setIsReadyToCompare}
            />
          ))}
        </section>
        <h1 className="text-blue-900 md:text-5xl text-4xl text-center font-medium lg:leading-snug py-10 bg-blue">
          <span className="text-blue-500">|</span> Brands{' '}
          <span className="text-blue-500">|</span>
        </h1>
        {isReadyToCompare ? (
          ''
        ) : (
          <div className="max-w-7xl mx-auto w-full flex justify-center">
            <BrandsSlide data={props.data} />
          </div>
        )}

        {isReadyToCompare ? (
          <div className="fixed w-full top-2 left-0 lg:px-40 px-10 py-20 drop-shadow-2xl">
            <Modal
              setCarsToCompare={setCarsToCompare}
              setFilteredCarsToCompare={setFilteredCarsToCompare}
              filteredCarsToCompare={filteredCarsToCompare}
              setIsReadyToCompare={setIsReadyToCompare}
            />
          </div>
        ) : (
          ''
        )}
      </section>
    </MainLayout>
  )
}

export default HomePage
