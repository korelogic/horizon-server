class WatchedSet extends Set {
  onUpdate(fn) {
    this.updateFn = fn
  }

  _triggerUpdated(changelog) {
    if (this.updateFn) {
      this.updateFn(changelog)
    }
  }

  add(toAdd) {
    const returned = super.add(toAdd)
    this._triggerUpdated({ $add: [ toAdd ] })
    return returned
  }

  delete(toDelete) {
    const returned = super.delete(toDelete)
    this._triggerUpdated({ $remove: [ toDelete ] })
    return returned
  }

  clear() {
    const old = Array.from(this)
    const returned = super.clear()
    this._triggerUpdated({ $remove: old })
    return returned
  }
}

module.exports = WatchedSet
