package minpq;

import java.util.*;

/**
 * Unsorted array (or {@link ArrayList}) implementation of the {@link MinPQ} interface.
 *
 * @param <E> the type of elements in this priority queue.
 * @see MinPQ
 */
public class UnsortedArrayMinPQ<E> implements MinPQ<E> {
    /**
     * {@link List} of {@link PriorityNode} objects representing the element-priority pairs in no specific order.
     */
    private final List<PriorityNode<E>> elements;

    /**
     * Constructs an empty instance.
     */
    public UnsortedArrayMinPQ() {
        elements = new ArrayList<>();
    }

    /**
     * Constructs an instance containing all the given elements and their priority values.
     *
     * @param elementsAndPriorities each element and its corresponding priority.
     */
    public UnsortedArrayMinPQ(Map<E, Double> elementsAndPriorities) {
        elements = new ArrayList<>(elementsAndPriorities.size());
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
        PriorityNode<E> newNode = new PriorityNode<>(element, priority);
        elements.add(newNode);
    }

    @Override
    public boolean contains(E element) {
        // TODO: Replace with your code
        for (PriorityNode<E> node : elements) { //iterate through entire queue worst case
            if (node != null && node.getElement().equals(element)) { //if element is found then return
                return true;
            }
        }
        return false;
    }

    @Override
    public double getPriority(E element) {
        // TODO: Replace with your code
        for (PriorityNode<E> node : elements) { //iterate through entire list
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
        return getMinNode().getElement();
    }

    @Override
    public E removeMin() {
        if (isEmpty()) {
            throw new NoSuchElementException("PQ is empty");
        }
        // TODO: Replace with your code
        PriorityNode<E> minNode = getMinNode();
        elements.remove(minNode);
        return minNode.getElement();
    }

    @Override
    public void changePriority(E element, double priority) {
        if (!contains(element)) {
            throw new NoSuchElementException("PQ does not contain " + element);
        }
        // TODO: Replace with your code
        PriorityNode<E> node = null;
        for (PriorityNode<E> n : elements) {
            if (n.getElement().equals(element)) {
                node = n;  // Find the node that matches the element
                break;  // Exit the loop once the element is found
            }
        }

        node.setPriority(priority);
    }

    @Override
    public int size() {
        // TODO: Replace with your code
        return elements.size();
    }

    @Override
    public boolean isEmpty() {
        return elements.isEmpty();
    }

    private PriorityNode<E> getMinNode() {
        return elements.stream().min(Comparator.comparingDouble(PriorityNode::getPriority)).orElseThrow(() -> new NoSuchElementException("PQ is empty"));
    }
}
