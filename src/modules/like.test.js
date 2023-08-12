
/** @jest-environment jsdom */
import { getLikes, addLike } from './like';


class LikeCountTester {
  async testLikeCounts() {
    const totalTestItems = 15; 
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('itemsContainer');

  
    await populateItemsContainer(itemsContainer);

    describe('Testing Like Counts', () => {
      for (let i = 0; i < totalTestItems; i++) {
        const itemDiv = itemsContainer.querySelector(`[data-like="${i + 1}"]`);
        const likeButton = itemDiv.querySelector('.likeButton');
        let initialLikes = 0;

       
        const likeCountElement = itemDiv.querySelector('.likeCount');
        initialLikes = parseInt(likeCountElement.textContent.split(' ')[1]);

        it(`should increment like count for item ${i + 1}`, async () => {
    
          likeButton.click();

     
          const updatedLikes = parseInt(likeCountElement.textContent.split(' ')[1]);

        
          const actualLikes = await getLikes(`${i + 1}`);

         
          expect(updatedLikes).toBe(initialLikes + actualLikes);
        });
      }
    });
  }
}

const tester = new LikeCountTester();
tester.testLikeCounts();
