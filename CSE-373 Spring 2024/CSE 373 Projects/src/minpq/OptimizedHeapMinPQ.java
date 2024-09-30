package minpq;

import java.util.*;

/**
 * Optimized binary heap implementation of the {@link MinPQ} interface.
 *
 * @param <E> the type of elements in this priority queue.
 * @see MinPQ
 */
public class OptimizedHeapMinPQ<E> implements MinPQ<E> {
    /**
     * {@link List} of {@link PriorityNode} objects representing the heap of element-priority pairs.
     */
    private final List<PriorityNode<E>> elements;
    /**
     * {@link Map} of each element to its associated index in the {@code elements} heap.
     */
    private final Map<E, Integer> elementsToIndex;

    /**
     * Constructs an empty instance.
     */
    public OptimizedHeapMinPQ() {
        elements = new ArrayList<>();
        elementsToIndex = new HashMap<>();
        elements.add(null); // added a null in index 0
    }

    /**
     * Constructs an instance containing all the given elements and their priority values.
     *
     * @param elementsAndPriorities each element and its corresponding priority.
     */
    public OptimizedHeapMinPQ(Map<E, Double> elementsAndPriorities) {
        elements = new ArrayList<>(elementsAndPriorities.size());
        elementsToIndex = new HashMap<>(elementsAndPriorities.size());
        // TODO: Replace with your code
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

        int index = elements.size() - 1;
        elementsToIndex.put(element, index); //put it into the HashMap so it's easier to find later
        swim(index);
    }

    @Override
    public boolean contains(E element) {
        // TODO: Replace with your code
        return elementsToIndex.containsKey(element);
    }

    @Override
    public double getPriority(E element) {
        // TODO: Replace with your code
        if (!contains(element)) {
            throw new NoSuchElementException("Element not found: " + element);
        }
        return elements.get(elementsToIndex.get(element)).getPriority();
    }

    @Override
    public E peekMin() {
        if (isEmpty()) {
            throw new NoSuchElementException("PQ is empty");
        }
        // TODO: Replace with your code
        return elements.get(1).getElement();
    }

    @Override
    public E removeMin() {
        if (isEmpty()) {
            throw new NoSuchElementException("PQ is empty");
        }
        // TODO: Replace with your code
        return removeAt(1);
    }

    @Override
    public void changePriority(E element, double priority) {
        if (!contains(element)) {
            throw new NoSuchElementException("PQ does not contain " + element);
        }
        // TODO: Replace with your code
        int index = elementsToIndex.get(element);
        PriorityNode<E> node = elements.get(index);

        // easier than before as we just call the getPriority method which uses a HashmMap already
        double oldPriority = node.getPriority();
        node.setPriority(priority);
        if (priority < oldPriority) {
            swim(index);  // Swim if new priority is lower, to maintain the heap structure
        } else {
            sink(index);  // Sink if new priority is higher, to maintain the heap structure
        }
    }

    @Override
    public int size() {
        // TODO: Replace with your code
        return elements.size()-1;
    }

    private void swim(int k) {
        while (k > 1 && greater(k / 2, k)) {
            swap(k, k / 2);
            k = k / 2;
        }
    }

    private void sink(int k) {
        int n = elements.size() - 1;  // Ignore dummy node
        while (2 * k <= n) {
            int j = 2 * k;
            if (j < n && greater(j, j + 1)) j++;
            if (!greater(k, j)) break;
            swap(k, j);
            k = j;
        }
    }

    private boolean greater(int i, int j) {
        return elements.get(i).getPriority() > elements.get(j).getPriority();
    }

    private void swap(int i, int j) {
        Collections.swap(elements, i, j);
        elementsToIndex.put(elements.get(i).getElement(), i);
        elementsToIndex.put(elements.get(j).getElement(), j);
    }

    private E removeAt(int i) {
        if (i == elements.size() - 1) {  // Last element
            elementsToIndex.remove(elements.get(i).getElement());
            return elements.remove(i).getElement();
        }
        swap(i, elements.size() - 1);  // Swap with last element
        E element = elements.remove(elements.size() - 1).getElement();
        elementsToIndex.remove(element);
        sink(i);
        return element;
    }
}
