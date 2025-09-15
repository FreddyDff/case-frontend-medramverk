import ShowCard from '../ShowCard'

function ShowList({ shows, onShowSelect }) {
    return (
      <>
        {shows.map(show => (
          <ShowCard 
            key={show.id} 
            show={show} 
            onShowSelect={onShowSelect}
          />
        ))}
      </>
    )
  }

export default ShowList