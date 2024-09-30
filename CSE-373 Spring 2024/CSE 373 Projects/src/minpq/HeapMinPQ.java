package minpq;

import java.util.*;

/**
 * {@link PriorityQueue} implementation of the {@link MinPQ} interface.
 *
 * @param <E> the type of elements in this priority queue.
 * @see MinPQ
 */
public class HeapMinPQ<E> implements MinPQ<E> {
    /**
     * {@link PriorityQueue} storing {@link PriorityNode} objects representing each element-priority pair.
     */
    private final PriorityQueue<PriorityNode<E>> pq;

    /**
     * Constructs an empty instance.
     */
    public HeapMinPQ() {
        pq = new PriorityQueue<>(Comparator.comparingDouble(PriorityNode::getPriority));
    }

    /**
     * Constructs an instance containing all the given elements and their priority values.
     *
     * @param elementsAndPriorities each element and its corresponding priority.
     */
    public HeapMinPQ(Map<E, Double> elementsAndPriorities) {
        pq = new PriorityQueue<>(elementsAndPriorities.size(), Comparator.comparingDouble(PriorityNode::getPriority));
        for (Map.Entry<E, Double> entry : elementsAndPriorities.entrySet()) {
            add(entry.getKey(), entry.getValue());
        }
    }

    @Override
    public void add(E element, double priority) {
        if (contains(element)) {
            throw new IllegalArgumentException("Already contains " + element);
        }
        // TODO: Replace with your code
        pq.add(new PriorityNode<>(element, priority)); // directly adding it all in
    }

    @Override
    public boolean contains(E element) {
        // TODO: Replace with your code
        for (PriorityNode<E> node : pq) { //iterate through entire queue worst case
            if (node != null && node.getElement().equals(element)) { //if element is found then return
                return true;
            }
        }
        return false;
    }

    @Override
    public double getPriority(E element) {
        // TODO: Replace with your code
        for (PriorityNode<E> node : pq) { //iterate through entire list
            if (node != null && node.getElement().equals(element)) {
                return node.getPriority(); //same as contains but this time returning element's priority
            }
        }
        //put this at the end so that the runtime won't be N^2 in worse case
        // (if we called contains() before it would be that)
        throw new NoSuchElementException("PQ does not contain " + element);
    }

    @Override
    public E peekMin() {
        if (isEmpty()) {
            throw new NoSuchElementException("PQ is empty");
        }
        // TODO: Replace with your code
        return pq.peek().getElement(); //just get the root node basically
    }

    @Override
    public E removeMin() {
        if (isEmpty()) {
            throw new NoSuchElementException("PQ is empty");
        }
        // TODO: Replace with your code
        return pq.poll().getElement(); //use poll to remove the root
    }

    @Override
    public void changePriority(E element, double priority) {
        if (!contains(element)) {
            throw new NoSuchElementException("PQ does not contain " + element);
        }
        // TODO: Replace with your code
        List<PriorityNode<E>> temp = new ArrayList<>();

        while (!pq.isEmpty()) {
            PriorityNode<E> currentNode = pq.poll(); // Remove an element from the PQ
            if (currentNode.getElement().equals(element)) { //check if this element is the one we looking for
                currentNode.setPriority(priority); // if it is, update the priority
            }
            temp.add(currentNode); // Store the node temporarily in a temp PQ
        }

        for (PriorityNode<E> node : temp) {
            add(node.getElement(), node.getPriority()); // add all the nodes back from temp
        }
    }

    @Override
    public int size() {
        // TODO: Replace with your code
        return pq.size();
    }
}
